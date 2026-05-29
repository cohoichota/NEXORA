import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('SearchService');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS') || 'kafka:9092';

  // Port is 3009 for search-service
  const port = configService.get<number>('PORT') || 3009;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3009'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora Search Service')
      .setDescription(
        'Full-text and kNN (vector) product search powered by OpenSearch.\n\n' +
          'Supports keyword search, semantic AI search, autocomplete, and an AI shopping assistant chat endpoint.',
      )
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('search', 'Product search and autocomplete')
      .addTag('health', 'Service health checks')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc, {
      swaggerOptions: { persistAuthorization: true },
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port);
  logger.log(`Search Service running on http://localhost:${port}`);

  // Kafka Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [kafkaBrokers] },
      consumer: { groupId: 'search-service-group' },
    },
  });

  await app.startAllMicroservices();
  logger.log(`Search Service Kafka Microservice connected`);
}
bootstrap().catch((err) => {
  console.error('Failed to start search service', err);
});
