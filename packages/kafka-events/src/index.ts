// ═══════════════════════════════════════════════════════════════
// Nexora — Kafka Event Type Definitions
// Naming convention: {service}.{entity}.{action}
// ═══════════════════════════════════════════════════════════════

// ── Topic Names ───────────────────────────────────────────────

export const KAFKA_TOPICS = {
  // Auth
  AUTH_USER_REGISTERED: 'auth.user.registered',
  AUTH_USER_PASSWORD_RESET: 'auth.user.password_reset',

  // Products
  PRODUCT_CREATED: 'product.product.created',
  PRODUCT_UPDATED: 'product.product.updated',
  PRODUCT_DELETED: 'product.product.deleted',
  PRODUCT_APPROVED: 'product.product.approved',

  // Inventory
  INVENTORY_STOCK_UPDATED: 'inventory.stock.updated',
  INVENTORY_STOCK_RESERVED: 'inventory.stock.reserved',
  INVENTORY_STOCK_RELEASED: 'inventory.stock.released',
  INVENTORY_RESERVATION_FAILED: 'inventory.stock.reservation_failed',
  INVENTORY_LOW_STOCK: 'inventory.stock.low_stock',

  // Orders
  ORDER_CREATED: 'order.order.created',
  ORDER_CONFIRMED: 'order.order.confirmed',
  ORDER_CANCELLED: 'order.order.cancelled',
  ORDER_SHIPPED: 'order.order.shipped',
  ORDER_DELIVERED: 'order.order.delivered',

  // Payments
  PAYMENT_INITIATED: 'payment.payment.initiated',
  PAYMENT_COMPLETED: 'payment.payment.completed',
  PAYMENT_FAILED: 'payment.payment.failed',
  PAYMENT_REFUNDED: 'payment.payment.refunded',

  // Notifications
  NOTIFICATION_EMAIL_REQUESTED: 'notification.email.requested',
  NOTIFICATION_SMS_REQUESTED: 'notification.sms.requested',
  NOTIFICATION_PUSH_REQUESTED: 'notification.push.requested',

  // User Events (for analytics)
  USER_PRODUCT_VIEWED: 'user.product.viewed',
  USER_PRODUCT_SEARCHED: 'user.product.searched',
  USER_CART_UPDATED: 'user.cart.updated',
} as const;

export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];

// ── Base Event Interface ───────────────────────────────────────

export interface BaseEvent {
  eventId: string;       // UUID for idempotency
  eventType: KafkaTopic;
  aggregateId: string;   // Entity ID (orderId, productId, etc.)
  aggregateType: string; // 'Order', 'Product', etc.
  timestamp: number;     // Unix timestamp (ms)
  version: number;       // Schema version
}

// ── Auth Events ───────────────────────────────────────────────

export interface UserRegisteredEvent extends BaseEvent {
  eventType: 'auth.user.registered';
  payload: {
    userId: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
}

// ── Product Events ────────────────────────────────────────────

export interface ProductCreatedEvent extends BaseEvent {
  eventType: 'product.product.created';
  payload: {
    productId: string;
    title: string;
    description: string;
    price: number;
    categoryId: string;
    sellerId: string;
    imageUrls: string[];
    tags: string[];
  };
}

export interface ProductUpdatedEvent extends BaseEvent {
  eventType: 'product.product.updated';
  payload: {
    productId: string;
    changes: Record<string, unknown>;
  };
}

// ── Inventory Events ──────────────────────────────────────────

export interface StockReservedEvent extends BaseEvent {
  eventType: 'inventory.stock.reserved';
  payload: {
    orderId: string;
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
    }>;
    expiresAt: number;
  };
}

export interface ReservationFailedEvent extends BaseEvent {
  eventType: 'inventory.stock.reservation_failed';
  payload: {
    orderId: string;
    reason: string;
    failedItems: Array<{ productId: string; requested: number; available: number }>;
  };
}

// ── Order Events ──────────────────────────────────────────────

export interface OrderCreatedEvent extends BaseEvent {
  eventType: 'order.order.created';
  payload: {
    orderId: string;
    userId: string;
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    shippingAddressId: string;
  };
}

export interface OrderConfirmedEvent extends BaseEvent {
  eventType: 'order.order.confirmed';
  payload: {
    orderId: string;
    userId: string;
    total: number;
  };
}

export interface OrderCancelledEvent extends BaseEvent {
  eventType: 'order.order.cancelled';
  payload: {
    orderId: string;
    userId: string;
    reason: string;
  };
}

// ── Payment Events ────────────────────────────────────────────

export interface PaymentCompletedEvent extends BaseEvent {
  eventType: 'payment.payment.completed';
  payload: {
    paymentId: string;
    orderId: string;
    userId: string;
    amount: number;
    currency: string;
    provider: 'stripe' | 'paypal';
  };
}

export interface PaymentFailedEvent extends BaseEvent {
  eventType: 'payment.payment.failed';
  payload: {
    paymentId: string;
    orderId: string;
    userId: string;
    reason: string;
  };
}

// ── Notification Events ───────────────────────────────────────

export interface EmailRequestedEvent extends BaseEvent {
  eventType: 'notification.email.requested';
  payload: {
    to: string;
    template: string;
    data: Record<string, unknown>;
  };
}

// ── Union Type ────────────────────────────────────────────────

export type NexoraEvent =
  | UserRegisteredEvent
  | ProductCreatedEvent
  | ProductUpdatedEvent
  | StockReservedEvent
  | ReservationFailedEvent
  | OrderCreatedEvent
  | OrderConfirmedEvent
  | OrderCancelledEvent
  | PaymentCompletedEvent
  | PaymentFailedEvent
  | EmailRequestedEvent;
