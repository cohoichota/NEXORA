/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';

import {
  AnalyticsQueryDto,
  TopProductsQueryDto,
  TrackEventDto,
  OverviewMetricsDto,
  TopProductResponseDto,
  RevenueByPeriodResponseDto,
} from '../dto/analytics.dto';

@ApiTags('analytics')
@Controller('analytics')
@ApiBearerAuth('JWT')
export class AnalyticsController {
  // ── GET /analytics/overview ────────────────────────────────────

  @Get('overview')
  @ApiOperation({
    summary: 'Get business overview metrics',
    description:
      'Returns key business metrics including revenue, orders, AOV, conversion rate, and growth percentages. ' +
      'Data is aggregated from ClickHouse in real-time.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'ADMIN or SELLER' })
  @ApiResponse({ status: 200, description: 'Overview metrics', type: OverviewMetricsDto })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getOverview(
    @Headers('x-user-role') role: string,
    @Query() _query: AnalyticsQueryDto,
  ): Promise<OverviewMetricsDto> {
    if (role !== 'ADMIN' && role !== 'SELLER') {
      throw new ForbiddenException('Admin or Seller role required');
    }
    // TODO: analyticsService.getOverview(_query)
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      conversionRate: 0,
      uniqueVisitors: 0,
      cartAbandonmentRate: 0,
      revenueGrowth: 0,
      ordersGrowth: 0,
    };
  }

  // ── GET /analytics/revenue ─────────────────────────────────────

  @Get('revenue')
  @ApiOperation({
    summary: 'Get revenue time-series data',
    description: 'Returns revenue broken down by time period for charting dashboards.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true })
  @ApiResponse({ status: 200, description: 'Revenue by period', type: RevenueByPeriodResponseDto })
  async getRevenue(
    @Headers('x-user-role') role: string,
    @Query() _query: AnalyticsQueryDto,
  ): Promise<RevenueByPeriodResponseDto> {
    if (role !== 'ADMIN' && role !== 'SELLER') {
      throw new ForbiddenException('Admin or Seller role required');
    }
    // TODO: analyticsService.getRevenue(_query)
    return { period: _query.period, data: [], total: 0, growth: 0 };
  }

  // ── GET /analytics/products/top ───────────────────────────────

  @Get('products/top')
  @ApiOperation({
    summary: 'Get top-performing products',
    description:
      'Returns the best-performing products ranked by revenue, units sold, views, or conversion rate.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true })
  @ApiResponse({ status: 200, description: 'Top products', type: [TopProductResponseDto] })
  async getTopProducts(
    @Headers('x-user-role') role: string,
    @Query() _query: TopProductsQueryDto,
  ): Promise<TopProductResponseDto[]> {
    if (role !== 'ADMIN' && role !== 'SELLER') {
      throw new ForbiddenException('Admin or Seller role required');
    }
    // TODO: analyticsService.getTopProducts(_query)
    return [];
  }

  // ── GET /analytics/funnel ──────────────────────────────────────

  @Get('funnel')
  @ApiOperation({
    summary: 'Get conversion funnel metrics',
    description:
      'Returns the full purchase funnel: Visit → Product View → Add to Cart → Checkout → Purchase.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true })
  @ApiQuery({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @ApiResponse({
    status: 200,
    description: 'Funnel steps with rates',
    schema: {
      type: 'object',
      properties: {
        steps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Product View' },
              count: { type: 'number', example: 5000 },
              rate: {
                type: 'number',
                example: 33.3,
                description: 'Conversion rate from previous step (%)',
              },
            },
          },
        },
        overallConversionRate: { type: 'number', example: 2.1 },
      },
    },
  })
  async getFunnel(
    @Headers('x-user-role') role: string,
    @Query() _query: AnalyticsQueryDto,
  ): Promise<Record<string, unknown>> {
    if (role !== 'ADMIN' && role !== 'SELLER') {
      throw new ForbiddenException('Admin or Seller role required');
    }
    // TODO: analyticsService.getFunnel(_query)
    return { steps: [], overallConversionRate: 0 };
  }

  // ── GET /analytics/customers ───────────────────────────────────

  @Get('customers')
  @ApiOperation({
    summary: 'Get customer analytics',
    description: 'Returns new vs returning customers, LTV distribution, and geographic breakdown.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'Must be ADMIN' })
  @ApiResponse({ status: 200, description: 'Customer analytics' })
  async getCustomerAnalytics(
    @Headers('x-user-role') role: string,
    @Query() _query: AnalyticsQueryDto,
  ): Promise<Record<string, unknown>> {
    if (role !== 'ADMIN') throw new ForbiddenException('Admin role required');
    // TODO: analyticsService.getCustomers(_query)
    return { newCustomers: 0, returningCustomers: 0, averageLtv: 0, byCountry: [] };
  }

  // ── POST /analytics/track ──────────────────────────────────────

  @Post('track')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Track an analytics event',
    description:
      'Ingests a raw analytics event into ClickHouse. ' +
      'Called server-side to track page views, purchases, funnel events, etc.',
  })
  @ApiResponse({ status: 202, description: 'Event accepted' })
  async trackEvent(@Body() _dto: TrackEventDto): Promise<{ accepted: boolean }> {
    // TODO: analyticsService.track(_dto)
    return { accepted: true };
  }

  // ── GET /analytics/realtime ────────────────────────────────────

  @Get('realtime')
  @ApiOperation({
    summary: 'Get real-time active visitor count',
    description: 'Returns the count of active visitors in the last 5 minutes.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true })
  @ApiResponse({
    status: 200,
    description: 'Real-time metrics',
    schema: {
      type: 'object',
      properties: {
        activeVisitors: { type: 'number', example: 342 },
        ordersLastHour: { type: 'number', example: 18 },
        revenueLastHour: { type: 'number', example: 1823.4 },
        topActivePages: {
          type: 'array',
          items: {
            type: 'object',
            properties: { path: { type: 'string' }, visitors: { type: 'number' } },
          },
        },
      },
    },
  })
  async getRealtime(@Headers('x-user-role') role: string): Promise<Record<string, unknown>> {
    if (role !== 'ADMIN' && role !== 'SELLER') {
      throw new ForbiddenException('Admin or Seller role required');
    }
    // TODO: analyticsService.getRealtime()
    return { activeVisitors: 0, ordersLastHour: 0, revenueLastHour: 0, topActivePages: [] };
  }
}
