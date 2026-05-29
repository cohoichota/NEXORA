import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3006;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3006'],
    credentials: true,
  });

  // Kafka microservice connection
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKERS || 'localhost:29092'],
      },
      consumer: {
        groupId: 'order-service-group',
      },
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Nexora — Order Service')
      .setDescription(
        '## Order Lifecycle + Saga Orchestration\n\n' +
          'Manages the full order lifecycle from creation to delivery, ' +
          'using the **Choreography Saga** pattern via Kafka to ensure distributed consistency.\n\n' +
          '### Order State Machine\n' +
          '```\n' +
          'PENDING → CONFIRMED → PAYMENT_PROCESSING → PAID →\n' +
          '  PROCESSING → SHIPPED → DELIVERED → (RETURN_REQUESTED → RETURNED)\n' +
          '```\n\n' +
          '### Saga Steps\n' +
          '1. `PENDING` — order created, inventory reserved\n' +
          '2. `CONFIRMED` — payment initiated\n' +
          '3. `PAID` — payment confirmed, fulfillment begins\n' +
          '4. `SHIPPED` — logistics update received\n' +
          '5. `DELIVERED` — delivery confirmed\n\n' +
          '> On any failure, compensating transactions are triggered automatically.',
      )
      .setVersion('1.0')
      .setContact('Nexora Team', 'https://nexora.dev', 'team@nexora.dev')
      .addServer(`http://localhost:${port}`, 'Local Development')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('orders', 'Order lifecycle management')
      .addTag('health', 'Liveness and readiness checks')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'list',
        filter: true,
      },
      customSiteTitle: 'Nexora Order API',
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  logger.log(`Order Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
