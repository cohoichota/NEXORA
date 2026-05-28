import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
  CreateVariantDto,
} from './product.dto';

// ── Simple inline guard for demo — replace with proper JWT guard from shared lib
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
class OptionalJwtGuard implements CanActivate {
  canActivate(_ctx: ExecutionContext) { return true; }
}

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ── POST /products ─────────────────────────────────────────

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product (seller only)' })
  @ApiResponse({ status: 201, description: 'Product created' })
  async create(@Body() dto: CreateProductDto) {
    // TODO: Extract sellerId from JWT. For now use placeholder.
    const sellerId = 'placeholder-seller-id';
    return this.productService.create(sellerId, dto);
  }

  // ── GET /products ──────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List products (paginated, filterable)' })
  @ApiResponse({ status: 200, description: 'Paginated product list' })
  async findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  // ── GET /products/:id ──────────────────────────────────────

  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get a product by ID or slug' })
  @ApiParam({ name: 'idOrSlug', description: 'Product ID or slug' })
  @ApiResponse({ status: 200, description: 'Product detail' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.productService.findOne(idOrSlug);
  }

  // ── PATCH /products/:id ────────────────────────────────────

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const sellerId = 'placeholder-seller-id';
    return this.productService.update(id, sellerId, dto);
  }

  // ── DELETE /products/:id ───────────────────────────────────

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive a product (soft delete)' })
  async remove(@Param('id') id: string) {
    const sellerId = 'placeholder-seller-id';
    return this.productService.remove(id, sellerId);
  }

  // ── POST /products/generate-description ────────────────────

  @Post('generate-description')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate an AI product description' })
  async generateDescription(@Body() dto: { title: string; keywords: string[] }) {
    const description = await this.productService.generateDescription(dto.title, dto.keywords || []);
    return { description };
  }

  // ── POST /products/:id/variants ────────────────────────────

  @Post(':id/variants')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a variant to a product' })
  async addVariant(@Param('id') id: string, @Body() dto: CreateVariantDto) {
    const sellerId = 'placeholder-seller-id';
    return this.productService.addVariant(id, sellerId, dto);
  }
}
