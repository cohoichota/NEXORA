import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsDateString, IsNumber, Min, Max } from 'class-validator';

// ── Enums ─────────────────────────────────────────────────────────

export enum AnalyticsPeriod {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export enum AnalyticsMetric {
  REVENUE = 'revenue',
  ORDERS = 'orders',
  AOV = 'aov', // Average Order Value
  CONVERSION_RATE = 'conversion_rate',
  PAGE_VIEWS = 'page_views',
  UNIQUE_VISITORS = 'unique_visitors',
  ADD_TO_CART_RATE = 'add_to_cart_rate',
  CART_ABANDONMENT_RATE = 'cart_abandonment_rate',
  RETURN_RATE = 'return_rate',
  CUSTOMER_LTV = 'customer_ltv',
}

// ── DTOs ─────────────────────────────────────────────────────────

export class AnalyticsQueryDto {
  @ApiProperty({ enum: AnalyticsPeriod, example: AnalyticsPeriod.DAY })
  @IsEnum(AnalyticsPeriod)
  period: AnalyticsPeriod;

  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Start date (ISO 8601). Defaults to 30 days ago.',
  })
  @IsDateString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional({
    example: '2026-01-31',
    description: 'End date (ISO 8601). Defaults to today.',
  })
  @IsDateString()
  @IsOptional()
  to?: string;

  @ApiPropertyOptional({ example: 'cat-uuid', description: 'Filter by category UUID' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    example: 'seller-uuid',
    description: 'Filter by seller UUID (Admin/Seller)',
  })
  @IsString()
  @IsOptional()
  sellerId?: string;
}

export class TopProductsQueryDto {
  @ApiProperty({ enum: AnalyticsPeriod, example: AnalyticsPeriod.WEEK })
  @IsEnum(AnalyticsPeriod)
  period: AnalyticsPeriod;

  @ApiProperty({
    enum: ['revenue', 'units', 'views', 'conversion'],
    example: 'revenue',
    description: 'Metric to rank products by',
  })
  @IsString()
  rankBy: string;

  @ApiPropertyOptional({ example: 10, description: 'Number of results (max 50)' })
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}

export class TrackEventDto {
  @ApiProperty({ example: 'page_view', description: 'Event name' })
  @IsString()
  event: string;

  @ApiPropertyOptional({ example: 'user-uuid' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'session-id' })
  @IsString()
  @IsOptional()
  sessionId?: string;

  @ApiPropertyOptional({ description: 'Event properties' })
  properties?: Record<string, unknown>;
}

// ── Responses ─────────────────────────────────────────────────────

export class MetricDataPointDto {
  @ApiProperty({ example: '2026-01-15T00:00:00Z' }) timestamp: string;
  @ApiProperty({ example: 12345.67 }) value: number;
}

export class OverviewMetricsDto {
  @ApiProperty({ example: 125430.99 }) totalRevenue: number;
  @ApiProperty({ example: 1243 }) totalOrders: number;
  @ApiProperty({ example: 100.91 }) averageOrderValue: number;
  @ApiProperty({ example: 3.4, description: 'Conversion rate (%)' }) conversionRate: number;
  @ApiProperty({ example: 15230 }) uniqueVisitors: number;
  @ApiProperty({ example: 68.2, description: 'Cart abandonment rate (%)' })
  cartAbandonmentRate: number;
  @ApiProperty({ example: 2.1, description: 'Change vs previous period (%)' })
  revenueGrowth: number;
  @ApiProperty({ example: 5.3, description: 'Change vs previous period (%)' }) ordersGrowth: number;
}

export class TopProductResponseDto {
  @ApiProperty() productId: string;
  @ApiProperty() title: string;
  @ApiPropertyOptional() imageUrl?: string;
  @ApiProperty({ example: 12500.0 }) revenue: number;
  @ApiProperty({ example: 156 }) unitsSold: number;
  @ApiProperty({ example: 8900 }) views: number;
  @ApiProperty({ example: 2.8, description: 'Conversion rate (%)' }) conversionRate: number;
}

export class RevenueByPeriodResponseDto {
  @ApiProperty({ enum: AnalyticsPeriod }) period: AnalyticsPeriod;
  @ApiProperty({ type: [MetricDataPointDto] }) data: MetricDataPointDto[];
  @ApiProperty({ example: 125430.99 }) total: number;
  @ApiProperty({ example: 12.5, description: 'Growth vs previous period (%)' }) growth: number;
}
