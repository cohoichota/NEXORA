import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationGateway } from '../../infrastructure/websockets/notification.gateway';
import { KafkaTopics, OrderEventTypes, ProductEventTypes } from '@nexora/kafka-events';

@Controller()
export class KafkaEventConsumer {
  private readonly logger = new Logger(KafkaEventConsumer.name);

  constructor(private readonly gateway: NotificationGateway) {}

  @EventPattern(KafkaTopics.ORDERS)
  handleOrderEvent(@Payload() message: any) {
    if (!message || !message.value) return;

    const event = message.value;
    
    switch (event.type) {
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
  handleProductEvent(@Payload() message: any) {
    if (!message || !message.value) return;

    const event = message.value;
    
    // Broadcast product updates globally (e.g., for live stock updates on product pages)
    if (event.type === ProductEventTypes.PRODUCT_UPDATED) {
      this.gateway.sendToAll('product:updated', event.payload);
    }
  }
}
