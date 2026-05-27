import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './infrastructure/health/health.module';
import { AuthModule } from './application/auth/auth.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    ThrottlerModule.forRoot([
      { name: 'default', ttl: 60000, limit: 100 },
      { name: 'auth', ttl: 60000, limit: 10 },
    ]),

    PrismaModule,
    HealthModule,
    PrometheusModule.register(),
    AuthModule,
  ],
})
export class AppModule {}
