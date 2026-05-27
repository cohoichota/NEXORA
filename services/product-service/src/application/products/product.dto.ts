import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsUrl,
  MaxLength,
  MinLength,
  Min,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ── Product Status ─────────────────────────────────────────────

export enum ProductStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

// ── Create Product ─────────────────────────────────────────────

export class CreateProductDto {
  @ApiProperty({ example: 'Premium Wireless Headphones' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Experience crystal-clear audio...' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional({ example: 'Quick overview of the product' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  shortDesc?: string;

  @ApiProperty({ example: 'cat-uuid-here' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  basePrice: number;

  @ApiPropertyOptional({ example: 149.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  comparePrice?: number;

  @ApiPropertyOptional({ example: 'Sony' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  brand?: string;

  @ApiPropertyOptional({ example: ['electronics', 'audio', 'wireless'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isDigital?: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ enum: ProductStatus })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}

// ── Create Variant ─────────────────────────────────────────────

export class CreateVariantDto {
  @ApiProperty({ example: 'SKU-HDPH-BLK-L' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  sku: string;

  @ApiProperty({ example: 'Black / Large' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: { color: 'black', size: 'L' } })
  attributes: Record<string, string>;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}

// ── Query ──────────────────────────────────────────────────────

export class ProductQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 24;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sellerId?: string;

  @ApiPropertyOptional({ enum: ProductStatus })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({ enum: ['newest', 'price_asc', 'price_desc', 'rating', 'popular'] })
  @IsString()
  @IsOptional()
  sort?: string = 'newest';
}
