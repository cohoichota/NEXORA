import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NotificationService');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS') || 'kafka:9092';

  // REST API (mainly for health checks or admin routes)
  const port = configService.get<number>('PORT') || 3007;

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora Notification Service')
      .setDescription('API Documentation for notification-service')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('notification')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc);
  }

  await app.listen(port);
  logger.log(`Notification Service HTTP & WS running on port ${port}`);

  // Kafka Microservice (listening to events)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaBrokers],
      },
      consumer: {
        groupId: 'notification-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  logger.log(`Notification Service Kafka Microservice connected`);
}
bootstrap().catch(console.error);
