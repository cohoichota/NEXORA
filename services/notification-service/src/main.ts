import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('NotificationService');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS') || 'kafka:9092';

  // REST API (mainly for health checks or admin routes)
  const port = configService.get<number>('PORT') || 3007;
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
bootstrap();
