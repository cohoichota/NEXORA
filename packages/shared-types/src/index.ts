// ═══════════════════════════════════════════════════════════════
// Nexora — Shared TypeScript Types
// Used across all apps and services
// ═══════════════════════════════════════════════════════════════

// ── Enums ─────────────────────────────────────────────────────

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export enum ProductStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

// ── User Types ──────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  role: UserRole;
  // Inline profile fields (flattened for convenience)
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  emailVerified: boolean;
  isActive: boolean;
  profile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  phone?: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string; // 'Home', 'Work', etc.
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

// ── Auth Types ──────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string; // userId
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// ── Product Types ────────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  status: ProductStatus;
  categoryId: string;
  sellerId: string;
  images: ProductImage[];
  variants: ProductVariant[];
  inventory?: Inventory;
  rating?: number;
  reviewCount?: number;
  image?: string;
  name?: string;
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string;
  order: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title: string;
  price: number;
  attributes: Record<string, string>; // { "color": "red", "size": "L" }
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  imageUrl?: string;
}

// ── Inventory Types ──────────────────────────────────────────────

export interface Inventory {
  id: string;
  productId: string;
  quantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
}

// ── Cart Types ───────────────────────────────────────────────────

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  expiresAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product?: Product;
  name?: string;
  image?: string;
  sku?: string;
}

// ── Order Types ──────────────────────────────────────────────────

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  total: number;
  payment?: Payment;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  productTitle: string;
  productImageUrl?: string;
}

// ── Payment Types ─────────────────────────────────────────────────

export interface Payment {
  id: string;
  orderId: string;
  status: PaymentStatus;
  provider: 'stripe' | 'paypal';
  amount: number;
  currency: string;
  providerPaymentId?: string;
  idempotencyKey: string;
  createdAt: Date;
}

// ── API Response Types ────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

// ── Pagination Query ──────────────────────────────────────────────

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ── Search Types ──────────────────────────────────────────────────

export interface SearchQuery extends PaginationQuery {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export interface SearchResult {
  hits: Product[];
  total: number;
  facets: SearchFacets;
  suggestions: string[];
}

export interface SearchFacets {
  category: FacetItem[];
  brand: FacetItem[];
  priceRange: FacetItem[];
}

export interface FacetItem {
  key: string;
  count: number;
}
