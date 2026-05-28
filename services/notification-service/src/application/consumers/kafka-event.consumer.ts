import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaTopics, OrderEventTypes, ProductEventTypes } from '@nexora/kafka-events';

import { NotificationGateway } from '../../infrastructure/websockets/notification.gateway';

@Controller()
export class KafkaEventConsumer {
  // Logger removed because it's unused

  constructor(private readonly gateway: NotificationGateway) {}

  @EventPattern(KafkaTopics.ORDERS)
  handleOrderEvent(
    @Payload()
    message: {
      value?: { type: string; payload: Record<string, unknown> & { userId: string } };
    },
  ) {
    if (!message || !message.value) return;

    const event = message.value;

    switch (event.type as unknown as OrderEventTypes) {
      case OrderEventTypes.ORDER_CREATED:
        this.gateway.sendToUser(event.payload.userId, 'order:created', event.payload);
        break;
      case OrderEventTypes.ORDER_CONFIRMED:
        this.gateway.sendToUser(event.payload.userId, 'order:confirmed', event.payload);
        break;
      case OrderEventTypes.ORDER_CANCELLED:
        this.gateway.sendToUser(event.payload.userId, 'order:cancelled', event.payload);
        break;
    }
  }

  @EventPattern(KafkaTopics.PRODUCTS)
  handleProductEvent(
    @Payload() message: { value?: { type: string; payload: Record<string, unknown> } },
  ) {
    if (!message || !message.value) return;

    const event = message.value;

    // Broadcast product updates globally (e.g., for live stock updates on product pages)
    if ((event.type as unknown as ProductEventTypes) === ProductEventTypes.PRODUCT_UPDATED) {
      this.gateway.sendToAll('product:updated', event.payload);
    }
  }
}
