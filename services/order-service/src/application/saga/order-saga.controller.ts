import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { OrderStatus } from '../orders/order.dto';
import { OrderService } from '../orders/order.service';

@Controller()
export class OrderSagaController {
  private readonly logger = new Logger(OrderSagaController.name);

  constructor(private readonly orderService: OrderService) {}

  @EventPattern('nexora.payments')
  async handlePaymentEvents(
    @Payload()
    message: {
      value?: { type: string; payload: { orderId: string; paymentId?: string; reason?: string } };
      type?: string;
      payload?: { orderId: string; paymentId?: string; reason?: string };
    },
  ) {
    // The message is expected to be a CloudEvent or simple payload
    const event =
      message.value ||
      (message as unknown as {
        type: string;
        payload: { orderId: string; paymentId?: string; reason?: string };
      });

    if (!event || !event.type) return;

    this.logger.log(`Received payment event: ${event.type} for order ${event.payload?.orderId}`);

    try {
      if (event.type === 'PAYMENT_PROCESSED') {
        await this.orderService.updateStatus(event.payload.orderId, 'system', {
          status: OrderStatus.PAID,
          note: `Payment successful. Payment ID: ${event.payload.paymentId}`,
        });
      } else if (event.type === 'PAYMENT_FAILED') {
        await this.orderService.updateStatus(event.payload.orderId, 'system', {
          status: OrderStatus.CANCELLED,
          note: `Payment failed: ${event.payload.reason}`,
        });
      }
    } catch (error: unknown) {
      this.logger.error(
        `Failed to handle payment event ${event.type}: ${(error as Error).message}`,
      );
    }
  }
}
