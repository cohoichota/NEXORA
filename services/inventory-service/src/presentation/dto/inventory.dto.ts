import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsNumber, IsString, IsOptional, IsEnum, Min, IsBoolean } from 'class-validator';

// ── Enums ─────────────────────────────────────────────────────────

export enum StockMovementType {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
  RESERVATION = 'RESERVATION',
  CANCELLATION = 'CANCELLATION',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN = 'RETURN',
}

// ── DTOs ─────────────────────────────────────────────────────────

export class SetStockDto {
  @ApiProperty({ example: 'variant-uuid', description: 'Product variant UUID' })
  @IsUUID()
  variantId: string;

  @ApiProperty({ example: 100, description: 'Absolute quantity to set' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ example: 10, description: 'Low-stock alert threshold' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  lowStockThreshold?: number;
}

export class AdjustStockDto {
  @ApiProperty({
    example: 5,
    description: 'Delta to apply (positive = add, negative = remove)',
  })
  @IsNumber()
  @Type(() => Number)
  delta: number;

  @ApiProperty({ enum: StockMovementType, example: StockMovementType.ADJUSTMENT })
  @IsEnum(StockMovementType)
  reason: StockMovementType;

  @ApiPropertyOptional({
    example: 'ORDER-12345',
    description: 'Reference ID (order, return, etc.)',
  })
  @IsString()
  @IsOptional()
  referenceId?: string;
}

export class ReserveStockDto {
  @ApiProperty({ example: 'order-uuid' })
  @IsUUID()
  orderId: string;

  @ApiProperty({
    description: 'Items to reserve',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        variantId: { type: 'string', format: 'uuid' },
        quantity: { type: 'number', minimum: 1 },
      },
    },
  })
  items: Array<{ variantId: string; quantity: number }>;
}

export class InventoryQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 50;

  @ApiPropertyOptional({ example: 'prod-uuid', description: 'Filter by product UUID' })
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional({ example: true, description: 'Only return low-stock items' })
  @IsBoolean()
  @IsOptional()
  lowStock?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Only return out-of-stock items' })
  @IsBoolean()
  @IsOptional()
  outOfStock?: boolean;
}

// ── Responses ─────────────────────────────────────────────────────

export class InventoryItemResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() variantId: string;
  @ApiProperty() productId: string;
  @ApiProperty({ example: 42 }) quantityOnHand: number;
  @ApiProperty({ example: 5 }) quantityReserved: number;
  @ApiProperty({ example: 37, description: 'quantityOnHand - quantityReserved' })
  quantityAvailable: number;
  @ApiProperty({ example: 10 }) lowStockThreshold: number;
  @ApiProperty({ example: false }) isLowStock: boolean;
  @ApiProperty({ example: false }) isOutOfStock: boolean;
  @ApiProperty() updatedAt: Date;
}

export class StockMovementResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() variantId: string;
  @ApiProperty({ enum: StockMovementType }) type: StockMovementType;
  @ApiProperty({ example: 5 }) delta: number;
  @ApiProperty({ example: 42, description: 'Quantity after this movement' }) balanceAfter: number;
  @ApiPropertyOptional() referenceId?: string;
  @ApiProperty() createdAt: Date;
}
