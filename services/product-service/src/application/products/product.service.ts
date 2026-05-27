import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaClient, Prisma, ProductStatus } from '@prisma/client';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
  CreateVariantDto,
} from './product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ── Create ─────────────────────────────────────────────────

  async create(sellerId: string, dto: CreateProductDto) {
    const slug = this.generateSlug(dto.title);

    // Ensure slug uniqueness
    const existing = await this.prisma.product.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const product = await this.prisma.product.create({
      data: {
        ...dto,
        sellerId,
        slug: finalSlug,
        status: ProductStatus.DRAFT,
        basePrice: new Prisma.Decimal(dto.basePrice),
        comparePrice: dto.comparePrice ? new Prisma.Decimal(dto.comparePrice) : null,
        tags: dto.tags ?? [],
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: true,
        variants: true,
      },
    });

    this.logger.log(`Product created: ${product.id} by seller ${sellerId}`);
    return product;
  }

  // ── List (paginated, filterable) ───────────────────────────

  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 24, q, categoryId, sellerId, status, minPrice, maxPrice, sort } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
          { tags: { has: q.toLowerCase() } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(sellerId && { sellerId }),
      ...(status ? { status } : { status: ProductStatus.APPROVED }),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            basePrice: {
              ...(minPrice !== undefined && { gte: new Prisma.Decimal(minPrice) }),
              ...(maxPrice !== undefined && { lte: new Prisma.Decimal(maxPrice) }),
            },
          }
        : {}),
    };

    const orderBy = this.getSortOrder(sort ?? 'newest');

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
          variants: { where: { isActive: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  // ── Get one ────────────────────────────────────────────────

  async findOne(idOrSlug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true } },
      },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // ── Update ─────────────────────────────────────────────────

  async update(id: string, sellerId: string, dto: UpdateProductDto, isAdmin = false) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    if (!isAdmin && product.sellerId !== sellerId) {
      throw new ForbiddenException('You can only edit your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.basePrice !== undefined && { basePrice: new Prisma.Decimal(dto.basePrice) }),
        ...(dto.comparePrice !== undefined && {
          comparePrice: dto.comparePrice ? new Prisma.Decimal(dto.comparePrice) : null,
        }),
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true } },
      },
    });
  }

  // ── Delete ─────────────────────────────────────────────────

  async remove(id: string, sellerId: string, isAdmin = false) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    if (!isAdmin && product.sellerId !== sellerId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    // Soft delete — set status to ARCHIVED
    await this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.ARCHIVED },
    });
  }

  // ── Variants ───────────────────────────────────────────────

  async addVariant(productId: string, sellerId: string, dto: CreateVariantDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.sellerId !== sellerId) throw new ForbiddenException('Access denied');

    const existing = await this.prisma.productVariant.findUnique({ where: { sku: dto.sku } });
    if (existing) throw new ConflictException(`SKU ${dto.sku} already exists`);

    return this.prisma.productVariant.create({
      data: {
        productId,
        ...dto,
        price: new Prisma.Decimal(dto.price),
      },
    });
  }

  // ── Helpers ────────────────────────────────────────────────

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private getSortOrder(sort: string): Prisma.ProductOrderByWithRelationInput {
    switch (sort) {
      case 'price_asc': return { basePrice: 'asc' };
      case 'price_desc': return { basePrice: 'desc' };
      case 'rating': return { rating: 'desc' };
      case 'popular': return { reviewCount: 'desc' };
      case 'newest': default: return { createdAt: 'desc' };
    }
  }
}
