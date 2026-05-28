import { Module } from '@nestjs/common';

import { PaymentModule } from '../payments/payment.module';

import { PaymentSagaController } from './payment-saga.controller';

@Module({
  imports: [PaymentModule],
  controllers: [PaymentSagaController],
})
export class PaymentSagaModule {}
