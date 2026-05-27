import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsNumber, IsOptional, Min, Max, IsPositive } from 'class-validator';

// ── Cart Domain Types ──────────────────────────────────────────

export interface CartItemData {
  id: string; // variantId or productId if no variant
  productId: string;
  variantId?: string;
  quantity: number;
  price: number; // snapshot at add-time
  title: string; // snapshot
  imageUrl?: string;
  sku?: string;
  addedAt: string; // ISO string
}

export interface CartData {
  userId: string;
  guestId?: string;
  items: CartItemData[];
  updatedAt: string;
}

// ── DTOs ───────────────────────────────────────────────────────

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID' })
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({ description: 'Variant ID (if product has variants)' })
  @IsUUID()
  @IsOptional()
  variantId?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @Max(99)
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ description: 'Snapshot price at add-time' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ description: 'Product title snapshot' })
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sku?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0) // 0 = remove
  @Max(99)
  @Type(() => Number)
  quantity: number;
}

export class MergeCartDto {
  @ApiProperty({ description: 'Guest cart ID to merge into user cart' })
  @IsString()
  guestId: string;
}
