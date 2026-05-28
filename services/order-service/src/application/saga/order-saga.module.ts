import { Module } from '@nestjs/common';

import { OrderModule } from '../orders/order.module';

import { OrderSagaController } from './order-saga.controller';

@Module({
  imports: [OrderModule],
  controllers: [OrderSagaController],
})
export class OrderSagaModule {}
