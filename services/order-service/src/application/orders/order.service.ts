import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Prisma, OrderStatus } from '@prisma/client';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto } from './order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private orderCounter = 0;

  constructor(private readonly prisma: PrismaService) {}

  // ── Create order ───────────────────────────────────────────

  async createOrder(userId: string, dto: CreateOrderDto) {
    if (dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    const subtotal = dto.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const tax = Math.round(subtotal * 0.1 * 100) / 100; // 10% tax placeholder
    const total = subtotal + tax;
    const orderNumber = await this.generateOrderNumber();

    const order = await this.prisma.order.create({
      data: {
        number: orderNumber,
        userId,
        status: OrderStatus.PENDING,
        subtotal: new Prisma.Decimal(subtotal),
        tax: new Prisma.Decimal(tax),
        total: new Prisma.Decimal(total),
        shippingAddress: dto.shippingAddress as unknown as Prisma.InputJsonValue,
        billingAddress: dto.billingAddress as unknown as Prisma.InputJsonValue ?? Prisma.JsonNull,
        notes: dto.notes,
        metadata: dto.couponCode ? { couponCode: dto.couponCode } : Prisma.JsonNull,
        placedAt: new Date(),
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            sellerId: item.sellerId,
            title: item.title,
            sku: item.sku,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            unitPrice: new Prisma.Decimal(item.unitPrice),
            totalPrice: new Prisma.Decimal(item.unitPrice * item.quantity),
          })),
        },
        timeline: {
          create: {
            actor: userId,
            event: 'order.created',
            data: { orderNumber, total },
          },
        },
      },
      include: {
        items: true,
        payments: true,
        shipments: true,
        timeline: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });

    this.logger.log(`Order ${orderNumber} created for user ${userId} — $${total}`);
    return order;
  }

  // ── List orders for user ───────────────────────────────────

  async findUserOrders(userId: string, query: OrderQueryDto) {
    const { page = 1, limit = 20, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      userId,
      ...(status && { status }),
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { take: 3 },         // preview items
          payments: { take: 1 },
          shipments: { take: 1 },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ── Get single order ───────────────────────────────────────

  async findOne(orderId: string, userId: string, isAdmin = false) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        payments: true,
        shipments: true,
        timeline: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (!isAdmin && order.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return order;
  }

  // ── Update status (admin / system) ────────────────────────

  async updateStatus(orderId: string, actor: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: dto.status as OrderStatus,
        timeline: {
          create: {
            actor,
            event: `order.status.${dto.status.toLowerCase()}`,
            data: dto.note ? { note: dto.note } : undefined,
          },
        },
      },
      include: { items: true, payments: true, shipments: true, timeline: true },
    });

    this.logger.log(`Order ${orderId} status → ${dto.status} by ${actor}`);
    return updated;
  }

  // ── Cancel order ───────────────────────────────────────────

  async cancelOrder(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId) throw new ForbiddenException('Access denied');

    const cancellable: OrderStatus[] = [OrderStatus.PENDING, OrderStatus.PAYMENT_PENDING];
    if (!cancellable.includes(order.status)) {
      throw new BadRequestException(`Cannot cancel order in status: ${order.status}`);
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        timeline: {
          create: { actor: userId, event: 'order.cancelled', data: null },
        },
      },
      include: { items: true, timeline: true },
    });
  }

  // ── Private helpers ────────────────────────────────────────

  private async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.order.count();
    const sequence = String(count + 1).padStart(6, '0');
    return `NEX-${year}-${sequence}`;
  }
}
