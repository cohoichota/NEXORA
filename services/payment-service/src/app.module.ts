import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { OutboxModule } from './application/outbox/outbox.module';
import { PaymentModule } from './application/payments/payment.module';
import { PaymentSagaModule } from './application/saga/payment-saga.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { KafkaModule } from './infrastructure/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    KafkaModule,
    ScheduleModule.forRoot(),
    OutboxModule,
    PaymentModule,
    PaymentSagaModule,
  ],
})
export class AppModule {}
