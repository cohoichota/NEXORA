import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { OrderModule } from './application/orders/order.module';
import { OutboxModule } from './application/outbox/outbox.module';
import { OrderSagaModule } from './application/saga/order-saga.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { HealthModule } from './infrastructure/health/health.module';
import { KafkaModule } from './infrastructure/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60000, limit: 100 }]),
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
