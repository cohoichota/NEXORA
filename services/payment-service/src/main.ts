import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3007;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    rawBody: true, // Required for Stripe webhook signature verification
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3007'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora — Payment Service')
      .setDescription(
        '## Stripe / PayPal Payment Integration\n\n' +
          'Handles payment initiation, refunds, and webhook processing.\n\n' +
          '### Flow\n' +
          '1. `order-service` publishes `ORDER_CREATED` Kafka event\n' +
          '2. `payment-service` consumes it and initiates payment via provider\n' +
          '3. Provider calls back via webhooks (`/payments/webhook/stripe` or `/payments/webhook/paypal`)\n' +
          '4. `payment-service` publishes `PAYMENT_PROCESSED` or `PAYMENT_FAILED` event\n\n' +
          '> **Note:** Webhook endpoints require raw body for signature verification.',
      )
      .setVersion('1.0')
      .setContact('Nexora Team', 'https://nexora.dev', 'team@nexora.dev')
      .addServer(`http://localhost:${port}`, 'Local Development')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('payments', 'Payment initiation, query, and refunds')
      .addTag('health', 'Liveness and readiness checks')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'list',
        filter: true,
      },
      customSiteTitle: 'Nexora Payment API',
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  // Connect Kafka Microservice
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKERS || 'localhost:29092'],
      },
      consumer: {
        groupId: 'payment-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  logger.log(`Payment Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
