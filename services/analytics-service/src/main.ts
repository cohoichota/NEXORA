import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3011;
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
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3011'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora — Analytics Service')
      .setDescription(
        '## ClickHouse Analytics\n\n' +
          'Real-time and historical analytics powered by **ClickHouse**, providing sub-second ' +
          'query performance over billions of events.\n\n' +
          '### Key Metrics\n' +
          '| Metric | Description |\n' +
          '|---|---|\n' +
          '| Revenue | Total GMV broken down by time period |\n' +
          '| AOV | Average Order Value |\n' +
          '| Conversion Rate | Sessions that resulted in a purchase |\n' +
          '| Cart Abandonment | Carts started but not purchased |\n' +
          '| Customer LTV | Lifetime value of a customer |\n\n' +
          '> Events are ingested via `POST /analytics/track` and streamed through Kafka for batch processing.',
      )
      .setVersion('1.0')
      .setContact('Nexora Team', 'https://nexora.dev', 'team@nexora.dev')
      .addServer(`http://localhost:${port}`, 'Local Development')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('analytics', 'Business metrics and event tracking')
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
      customSiteTitle: 'Nexora Analytics API',
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Analytics Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
