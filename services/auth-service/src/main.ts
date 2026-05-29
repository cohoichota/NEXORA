import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3001;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.use(cookieParser());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // ── Swagger ────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Nexora — Auth Service')
      .setDescription(
        '## Authentication & Authorization\n\n' +
          'Handles user registration, login, JWT token management (access + refresh), ' +
          'and OAuth2 social login.\n\n' +
          '### Token Flow\n' +
          '1. `POST /auth/register` or `POST /auth/login` → returns `accessToken` + `refreshToken`\n' +
          '2. Include `Authorization: Bearer <accessToken>` on protected routes\n' +
          '3. `POST /auth/refresh` when the access token expires\n' +
          '4. `POST /auth/logout` to revoke the refresh token\n\n' +
          '> Refresh tokens are also set as **httpOnly** cookies (`refreshToken`) automatically.',
      )
      .setVersion('1.0')
      .setContact('Nexora Team', 'https://nexora.dev', 'team@nexora.dev')
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .addServer(`http://localhost:${port}`, 'Local Development')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Paste your accessToken here',
        },
        'JWT',
      )
      .addCookieAuth(
        'refreshToken',
        { type: 'apiKey', in: 'cookie', name: 'refreshToken' },
        'Cookie',
      )
      .addTag('auth', 'Register, login, refresh, logout, and social OAuth')
      .addTag('health', 'Liveness and readiness checks')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
      },
      customSiteTitle: 'Nexora Auth API',
    });
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Auth Service running on http://localhost:${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during bootstrap:', err);
  process.exit(1);
});
