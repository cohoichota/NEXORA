import { Injectable, NotFoundException, Logger } from '@nestjs/common';

import { RedisService } from '../../infrastructure/redis/redis.service';

import { CartData, CartItemData, AddToCartDto, UpdateCartItemDto, MergeCartDto } from './cart.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  private readonly TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
  private readonly GUEST_TTL = 24 * 60 * 60; // 1 day

  constructor(private readonly redis: RedisService) {}

  // ── Key helpers ────────────────────────────────────────────

  private userKey(userId: string) {
    return `cart:user:${userId}`;
  }
  private guestKey(guestId: string) {
    return `cart:guest:${guestId}`;
  }

  // ── Get cart ───────────────────────────────────────────────

  async getCart(userId: string): Promise<CartData> {
    const cart = await this.redis.getJson<CartData>(this.userKey(userId));
    return cart ?? this.emptyCart(userId);
  }

  async getGuestCart(guestId: string): Promise<CartData> {
    const cart = await this.redis.getJson<CartData>(this.guestKey(guestId));
    return cart ?? this.emptyGuestCart(guestId);
  }

  // ── Add item ───────────────────────────────────────────────

  async addItem(userId: string, dto: AddToCartDto): Promise<CartData> {
    const cart = await this.getCart(userId);
    const itemId = dto.variantId ?? dto.productId;

    const existingIdx = cart.items.findIndex((i) => i.id === itemId);

    if (existingIdx !== -1) {
      // Increase quantity — cap at 99
      cart.items[existingIdx].quantity = Math.min(
        cart.items[existingIdx].quantity + dto.quantity,
        99,
      );
    } else {
      const newItem: CartItemData = {
        id: itemId,
        productId: dto.productId,
        variantId: dto.variantId,
        quantity: dto.quantity,
        price: dto.price,
        title: dto.title,
        imageUrl: dto.imageUrl,
        sku: dto.sku,
        addedAt: new Date().toISOString(),
      };
      cart.items.push(newItem);
    }

    cart.updatedAt = new Date().toISOString();
    await this.redis.setJson(this.userKey(userId), cart, this.TTL_SECONDS);
    this.logger.debug(`Item ${itemId} added to cart for user ${userId}`);
    return cart;
  }

  async addGuestItem(guestId: string, dto: AddToCartDto): Promise<CartData> {
    const cart = await this.getGuestCart(guestId);
    const itemId = dto.variantId ?? dto.productId;

    const existingIdx = cart.items.findIndex((i) => i.id === itemId);
    if (existingIdx !== -1) {
      cart.items[existingIdx].quantity = Math.min(
        cart.items[existingIdx].quantity + dto.quantity,
        99,
      );
    } else {
      cart.items.push({
        id: itemId,
        productId: dto.productId,
        variantId: dto.variantId,
        quantity: dto.quantity,
        price: dto.price,
        title: dto.title,
        imageUrl: dto.imageUrl,
        sku: dto.sku,
        addedAt: new Date().toISOString(),
      });
    }

    cart.updatedAt = new Date().toISOString();
    await this.redis.setJson(this.guestKey(guestId), cart, this.GUEST_TTL);
    return cart;
  }

  // ── Update item quantity ───────────────────────────────────

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto): Promise<CartData> {
    const cart = await this.getCart(userId);
    const idx = cart.items.findIndex((i) => i.id === itemId);
    if (idx === -1) throw new NotFoundException('Cart item not found');

    if (dto.quantity === 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = dto.quantity;
    }

    cart.updatedAt = new Date().toISOString();
    await this.redis.setJson(this.userKey(userId), cart, this.TTL_SECONDS);
    return cart;
  }

  // ── Remove item ────────────────────────────────────────────

  async removeItem(userId: string, itemId: string): Promise<CartData> {
    const cart = await this.getCart(userId);
    const before = cart.items.length;
    cart.items = cart.items.filter((i) => i.id !== itemId);
    if (cart.items.length === before) throw new NotFoundException('Cart item not found');

    cart.updatedAt = new Date().toISOString();
    await this.redis.setJson(this.userKey(userId), cart, this.TTL_SECONDS);
    return cart;
  }

  // ── Clear cart ─────────────────────────────────────────────

  async clearCart(userId: string): Promise<void> {
    await this.redis.deleteKeys(this.userKey(userId));
  }

  // ── Merge guest → user cart on login ──────────────────────

  async mergeCart(userId: string, dto: MergeCartDto): Promise<CartData> {
    const [userCart, guestCart] = await Promise.all([
      this.getCart(userId),
      this.getGuestCart(dto.guestId),
    ]);

    if (guestCart.items.length === 0) return userCart;

    for (const guestItem of guestCart.items) {
      const existingIdx = userCart.items.findIndex((i) => i.id === guestItem.id);
      if (existingIdx !== -1) {
        userCart.items[existingIdx].quantity = Math.min(
          userCart.items[existingIdx].quantity + guestItem.quantity,
          99,
        );
      } else {
        userCart.items.push(guestItem);
      }
    }

    userCart.updatedAt = new Date().toISOString();

    await Promise.all([
      this.redis.setJson(this.userKey(userId), userCart, this.TTL_SECONDS),
      this.redis.deleteKeys(this.guestKey(dto.guestId)), // clean up guest cart
    ]);

    this.logger.log(`Merged guest cart ${dto.guestId} into user ${userId}`);
    return userCart;
  }

  // ── Cart summary ───────────────────────────────────────────

  async getCartSummary(userId: string) {
    const cart = await this.getCart(userId);
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return {
      itemCount,
      subtotal: Math.round(subtotal * 100) / 100,
      currency: 'USD',
      items: cart.items,
      updatedAt: cart.updatedAt,
    };
  }

  // ── Private helpers ────────────────────────────────────────

  private emptyCart(userId: string): CartData {
    return { userId, items: [], updatedAt: new Date().toISOString() };
  }

  private emptyGuestCart(guestId: string): CartData {
    return { userId: '', guestId, items: [], updatedAt: new Date().toISOString() };
  }
}
