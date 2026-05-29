import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3010;
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
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3010'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora — Recommendation Service')
      .setDescription(
        '## AI-Powered Product Recommendations\n\n' +
          'Delivers personalized product recommendations using collaborative filtering, ' +
          'content-based filtering, and neural embedding models.\n\n' +
          '### Available Strategies\n' +
          '| Strategy | Endpoint | Description |\n' +
          '|---|---|---|\n' +
          '| Personalized | `GET /recommendations` | Based on user purchase/view history |\n' +
          '| Similar | `GET /recommendations/similar` | Item-to-item collaborative filtering |\n' +
          '| Trending | `GET /recommendations/trending` | Globally popular in last 24h |\n' +
          '| FBT | `GET /recommendations/frequently-bought-together` | Association rules |\n\n' +
          '> Track events with `POST /recommendations/track` to improve accuracy over time.',
      )
      .setVersion('1.0')
      .setContact('Nexora Team', 'https://nexora.dev', 'team@nexora.dev')
      .addServer(`http://localhost:${port}`, 'Local Development')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('recommendations', 'AI-powered product recommendations')
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
      customSiteTitle: 'Nexora Recommendation API',
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Recommendation Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
