import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsOptional, IsNumber, IsEnum, IsString, Min, Max } from 'class-validator';

// ── Enums ─────────────────────────────────────────────────────────

export enum RecommendationContext {
  HOMEPAGE = 'HOMEPAGE',
  PRODUCT_PAGE = 'PRODUCT_PAGE',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  SEARCH_RESULTS = 'SEARCH_RESULTS',
  POST_PURCHASE = 'POST_PURCHASE',
  EMAIL = 'EMAIL',
}

// ── DTOs ─────────────────────────────────────────────────────────

export class RecommendationQueryDto {
  @ApiPropertyOptional({
    example: 'user-uuid',
    description: 'User UUID for personalized recommendations. Anonymous if omitted.',
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    example: 'product-uuid',
    description: 'Seed product UUID (for "similar products" context)',
  })
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional({ enum: RecommendationContext, example: RecommendationContext.PRODUCT_PAGE })
  @IsEnum(RecommendationContext)
  @IsOptional()
  context?: RecommendationContext;

  @ApiPropertyOptional({ example: 8, description: 'Number of recommendations to return (max 20)' })
  @IsNumber()
  @Min(1)
  @Max(20)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 8;
}

export class TrackEventDto {
  @ApiProperty({ example: 'user-uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'product-uuid' })
  @IsUUID()
  productId: string;

  @ApiProperty({
    enum: ['VIEW', 'CLICK', 'ADD_TO_CART', 'PURCHASE', 'WISHLIST'],
    example: 'VIEW',
    description: 'User interaction event type',
  })
  @IsString()
  event: string;

  @ApiPropertyOptional({ description: 'Additional event metadata' })
  metadata?: Record<string, unknown>;
}

// ── Responses ─────────────────────────────────────────────────────

export class RecommendedProductDto {
  @ApiProperty() productId: string;
  @ApiProperty({ example: 'Premium Wireless Headphones' }) title: string;
  @ApiPropertyOptional() imageUrl?: string;
  @ApiProperty({ example: 99.99 }) price: number;
  @ApiProperty({ example: 0.92, description: 'Recommendation confidence score (0-1)' })
  score: number;
  @ApiProperty({ example: 'collaborative_filtering', description: 'Algorithm used' })
  algorithm: string;
}

export class RecommendationResponseDto {
  @ApiProperty({ type: [RecommendedProductDto] }) recommendations: RecommendedProductDto[];
  @ApiProperty({ enum: RecommendationContext }) context: RecommendationContext;
  @ApiPropertyOptional({ example: 'user-uuid' }) userId?: string;
  @ApiProperty({ example: 'hybrid', description: 'Strategy used' }) strategy: string;
  @ApiProperty({ example: 120, description: 'Inference time in milliseconds' }) inferenceMs: number;
}
