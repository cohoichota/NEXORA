import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderService } from '../orders/order.service';
import { OrderStatus } from '@prisma/client';

@Controller()
export class OrderSagaController {
  private readonly logger = new Logger(OrderSagaController.name);

  constructor(private readonly orderService: OrderService) {}

  @EventPattern('nexora.payments')
  async handlePaymentEvents(@Payload() message: any) {
    // The message is expected to be a CloudEvent or simple payload
    const event = message.value || message; // depending on kafkajs payload structure
    
    if (!event || !event.type) return;

    this.logger.log(`Received payment event: ${event.type} for order ${event.payload?.orderId}`);

    try {
      if (event.type === 'PAYMENT_PROCESSED') {
        await this.orderService.updateStatus(
          event.payload.orderId,
          'system',
          { status: OrderStatus.PAID, note: `Payment successful. Payment ID: ${event.payload.paymentId}` }
        );
      } else if (event.type === 'PAYMENT_FAILED') {
        await this.orderService.updateStatus(
          event.payload.orderId,
          'system',
          { status: OrderStatus.CANCELLED, note: `Payment failed: ${event.payload.reason}` }
        );
      }
    } catch (error: any) {
      this.logger.error(`Failed to handle payment event ${event.type}: ${error.message}`);
    }
  }
}
