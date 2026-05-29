import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3005;

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
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3005'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora — Cart Service')
      .setDescription(
        '## Shopping Cart (Redis-backed)\n\n' +
          'Manages authenticated user carts and anonymous guest carts, all stored in Redis for O(1) performance.\n\n' +
          '### Cart Types\n' +
          '- **User Cart** (`x-user-id` header) — persisted across sessions\n' +
          '- **Guest Cart** (`guestId` path param) — temporary, merged on login\n\n' +
          '### Post-Login Merge Flow\n' +
          '1. Guest adds items → guest cart created with a `guestId`\n' +
          '2. User logs in → call `POST /cart/merge` with the `guestId`\n' +
          '3. Guest cart items are merged into the user cart',
      )
      .setVersion('1.0')
      .setContact('Nexora Team', 'https://nexora.dev', 'team@nexora.dev')
      .addServer(`http://localhost:${port}`, 'Local Development')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('cart', 'Add, update, remove items, and merge guest carts')
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
      customSiteTitle: 'Nexora Cart API',
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Cart Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
