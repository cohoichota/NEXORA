import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('GatewayBootstrap');
  const port = process.env.PORT ?? 4000;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // OWASP Mitigations
  app.use(helmet());

  // Proxy Routes (using http-proxy-middleware v3/v4 syntax)
  app.use(
    createProxyMiddleware({
      pathFilter: '/api/v1/auth',
      target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/auth': '/auth' },
    }),
  );
  app.use(
    createProxyMiddleware({
      pathFilter: '/api/v1/products',
      target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/products': '/products' },
    }),
  );
  app.use(
    createProxyMiddleware({
      pathFilter: '/api/v1/cart',
      target: process.env.CART_SERVICE_URL || 'http://localhost:3003',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/cart': '/cart' },
    }),
  );
  app.use(
    createProxyMiddleware({
      pathFilter: '/api/v1/orders',
      target: process.env.ORDER_SERVICE_URL || 'http://localhost:3004',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/orders': '/orders' },
    }),
  );
  app.use(
    createProxyMiddleware({
      pathFilter: '/api/v1/search',
      target: process.env.SEARCH_SERVICE_URL || 'http://localhost:3008',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/search': '/search' },
    }),
  );
  app.use(
    createProxyMiddleware({
      pathFilter: '/api/v1/payments',
      target: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3006',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/payments': '/payments' },
    }),
  );
  app.use(
    createProxyMiddleware({
      pathFilter: '/socket.io',
      target: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3007',
      ws: true,
      changeOrigin: true,
    }),
  );

  // CORS configured at Gateway level, not individual services when accessed through gateway
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nexora API Gateway')
      .setDescription('BFF and Reverse Proxy for Nexora Microservices')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('gateway')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 API Gateway running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal Gateway Error:', err);
  process.exit(1);
});
