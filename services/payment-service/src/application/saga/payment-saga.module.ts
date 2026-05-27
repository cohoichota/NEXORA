import { Module } from '@nestjs/common';
import { PaymentSagaController } from './payment-saga.controller';
import { PaymentModule } from '../payments/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [PaymentSagaController],
})
export class PaymentSagaModule {}
