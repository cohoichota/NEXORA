import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { HealthModule } from './infrastructure/health/health.module';
import { AuthMiddleware } from './infrastructure/auth/auth.middleware';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
    HealthModule,
    PrometheusModule.register(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 req per minute globally
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
