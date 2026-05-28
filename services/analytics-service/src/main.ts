import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora Analytics Service')
      .setDescription('API Documentation for analytics-service')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('analytics')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc);
  }

  await app.listen(3011);
  logger.log('Analytics service is running on: http://localhost:3011');
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
