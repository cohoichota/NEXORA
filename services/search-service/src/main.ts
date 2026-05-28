import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('SearchService');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS') || 'kafka:9092';

  // REST API
  const port = configService.get<number>('PORT') || 3008;
  await app.listen(port);
  logger.log(`Search Service HTTP running on port ${port}`);

  // Kafka Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaBrokers],
      },
      consumer: {
        groupId: 'search-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  logger.log(`Search Service Kafka Microservice connected`);
}
bootstrap().catch((err) => {
  console.error('Failed to start search service', err);
});
