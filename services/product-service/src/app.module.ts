import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { HealthModule } from './infrastructure/health/health.module';
import { ProductModule } from './application/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([
      { name: 'default', ttl: 60000, limit: 200 },
    ]),
    PrismaModule,
    HealthModule,
    ProductModule,
  ],
})
export class AppModule {}
