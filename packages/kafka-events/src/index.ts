// packages/kafka-events/src/index.ts

export enum KafkaTopics {
  ORDERS = 'nexora.orders',
  PAYMENTS = 'nexora.payments',
}

export enum OrderEventTypes {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
}

export enum PaymentEventTypes {
  PAYMENT_PROCESSED = 'PAYMENT_PROCESSED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
}

export interface OrderCreatedEvent {
  type: OrderEventTypes.ORDER_CREATED;
  payload: {
    orderId: string;
    userId: string;
    totalAmount: number;
    currency: string;
  };
}

export interface PaymentProcessedEvent {
  type: PaymentEventTypes.PAYMENT_PROCESSED;
  payload: {
    orderId: string;
    paymentId: string;
    status: 'SUCCESS';
  };
}

export interface PaymentFailedEvent {
  type: PaymentEventTypes.PAYMENT_FAILED;
  payload: {
    orderId: string;
    reason: string;
  };
}

// A generic event payload type
export type NexoraEvent = OrderCreatedEvent | PaymentProcessedEvent | PaymentFailedEvent;
