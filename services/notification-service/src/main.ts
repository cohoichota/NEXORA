import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NotificationService');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS') || 'kafka:9092';

  // Port is 3008 for notification-service
  const port = configService.get<number>('PORT') || 3008;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3008'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora Notification Service')
      .setDescription(
        'Email / SMS / push notification dispatch API.\n\n' +
          'Triggers notifications via Kafka events, and exposes REST endpoints for direct dispatch and preference management.',
      )
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('notifications', 'Send and manage notifications')
      .addTag('preferences', 'User notification preferences')
      .addTag('health', 'Service health checks')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc, {
      swaggerOptions: { persistAuthorization: true },
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port);
  logger.log(`Notification Service running on http://localhost:${port}`);

  // Kafka Microservice (listening to events)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [kafkaBrokers] },
      consumer: { groupId: 'notification-service-group' },
    },
  });

  await app.startAllMicroservices();
  logger.log(`Notification Service Kafka Microservice connected`);
}
bootstrap().catch(console.error);
