import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('SearchService');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS') || 'kafka:9092';

  // REST API
  const port = configService.get<number>('PORT') || 3008;

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora Search Service')
      .setDescription('API Documentation for search-service')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('search')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc);
  }

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
