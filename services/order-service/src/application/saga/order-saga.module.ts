import { Module } from '@nestjs/common';
import { OrderSagaController } from './order-saga.controller';
import { OrderModule } from '../orders/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderSagaController],
})
export class OrderSagaModule {}
