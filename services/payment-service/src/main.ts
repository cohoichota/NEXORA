import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3007;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Connect Kafka Microservice
  app.connectMicroservice({
    transport: 4, // Transport.KAFKA
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKERS || 'localhost:29092'],
      },
      consumer: {
        groupId: 'payment-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  logger.log(`Payment Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
