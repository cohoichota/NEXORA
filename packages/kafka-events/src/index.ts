// packages/kafka-events/src/index.ts

export enum KafkaTopics {
  ORDERS = 'nexora.orders',
  PAYMENTS = 'nexora.payments',
  PRODUCTS = 'nexora.products',
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

export enum ProductEventTypes {
  PRODUCT_CREATED = 'PRODUCT_CREATED',
  PRODUCT_UPDATED = 'PRODUCT_UPDATED',
  PRODUCT_DELETED = 'PRODUCT_DELETED',
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

export interface ProductCreatedEvent {
  type: ProductEventTypes.PRODUCT_CREATED;
  payload: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    categoryId: string | null;
    isAvailable: boolean;
    tags: string[];
    createdAt: string;
  };
}

export interface ProductUpdatedEvent {
  type: ProductEventTypes.PRODUCT_UPDATED;
  payload: {
    id: string;
    name?: string;
    slug?: string;
    description?: string | null;
    price?: number;
    categoryId?: string | null;
    isAvailable?: boolean;
    tags?: string[];
  };
}

export interface ProductDeletedEvent {
  type: ProductEventTypes.PRODUCT_DELETED;
  payload: {
    id: string;
  };
}

// A generic event payload type
export type NexoraEvent = 
  | OrderCreatedEvent 
  | PaymentProcessedEvent 
  | PaymentFailedEvent
  | ProductCreatedEvent
  | ProductUpdatedEvent
  | ProductDeletedEvent;
