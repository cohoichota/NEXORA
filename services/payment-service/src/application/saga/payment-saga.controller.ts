import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { PaymentService } from '../payments/payment.service';

@Controller()
export class PaymentSagaController {
  private readonly logger = new Logger(PaymentSagaController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern('nexora.orders')
  async handleOrderEvents(
    @Payload()
    message: {
      value?: {
        type: string;
        payload: { orderId: string; userId: string; totalAmount: number; currency: string };
      };
      type?: string;
      payload?: { orderId: string; userId: string; totalAmount: number; currency: string };
    },
  ) {
    const event = message.value || message;

    if (!event || !event.type) return;

    if (event.type === 'ORDER_CREATED') {
      this.logger.log(`Received ORDER_CREATED for order ${event.payload?.orderId}`);
      await this.paymentService.processOrderPayment(event.payload);
    }
  }
}
