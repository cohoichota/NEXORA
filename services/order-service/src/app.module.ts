import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { HealthModule } from './infrastructure/health/health.module';
import { OrderModule } from './application/orders/order.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ScheduleModule } from '@nestjs/schedule';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { OutboxModule } from './application/outbox/outbox.module';
import { OrderSagaModule } from './application/saga/order-saga.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([
      { name: 'default', ttl: 60000, limit: 100 },
    ]),
    PrismaModule,
    HealthModule,
    PrometheusModule.register(),
    ScheduleModule.forRoot(),
    KafkaModule,
    OutboxModule,
    OrderSagaModule,
    OrderModule,
  ],
})
export class AppModule {}
