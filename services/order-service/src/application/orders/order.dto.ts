import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsObject,
  Min,
  MinLength,
} from 'class-validator';

// ── Address ────────────────────────────────────────────────────

export class AddressDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() line1: string;
  @ApiPropertyOptional() @IsString() @IsOptional() line2?: string;
  @ApiProperty() @IsString() city: string;
  @ApiPropertyOptional() @IsString() @IsOptional() state?: string;
  @ApiProperty() @IsString() postalCode: string;
  @ApiProperty() @IsString() country: string; // ISO 2-letter
}

// ── Order Item ─────────────────────────────────────────────────

export class CreateOrderItemDto {
  @ApiProperty() @IsUUID() productId: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() variantId?: string;
  @ApiProperty() @IsUUID() sellerId: string;
  @ApiProperty() @IsString() @MinLength(1) title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() sku?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() imageUrl?: string;
  @ApiProperty() @IsNumber() @Min(1) @Type(() => Number) quantity: number;
  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @Type(() => Number) unitPrice: number;
}

// ── Create Order ───────────────────────────────────────────────

export class CreateOrderDto {
  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @IsObject()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @ApiPropertyOptional({ type: AddressDto })
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => AddressDto)
  billingAddress?: AddressDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Coupon code or promo' })
  @IsString()
  @IsOptional()
  couponCode?: string;
}

// ── Update Status ──────────────────────────────────────────────

export enum OrderStatus {
  PENDING = 'PENDING',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}

// ── Query ──────────────────────────────────────────────────────

export class OrderQueryDto {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) page?: number = 1;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) limit?: number = 20;
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
