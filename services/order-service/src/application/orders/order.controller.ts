import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';

import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto } from './order.dto';
import { OrderService } from './order.service';

// ────────────────────────────────────────────────────────────
// NOTE: Auth is JWT-verified at the API Gateway layer.
// The gateway forwards x-user-id and x-user-role headers.
// ────────────────────────────────────────────────────────────

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ── POST /orders ───────────────────────────────────────────

  @Post()
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created' })
  async createOrder(@Headers('x-user-id') userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(userId, dto);
  }

  // ── GET /orders ────────────────────────────────────────────

  @Get()
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiOperation({ summary: 'List orders for authenticated user' })
  async findUserOrders(@Headers('x-user-id') userId: string, @Query() query: OrderQueryDto) {
    return this.orderService.findUserOrders(userId, query);
  }

  // ── GET /orders/:id ────────────────────────────────────────

  @Get(':id')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: false })
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get order details' })
  async findOne(
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') role: string,
    @Param('id') orderId: string,
  ) {
    const isAdmin = role === 'ADMIN';
    return this.orderService.findOne(orderId, userId, isAdmin);
  }

  // ── PATCH /orders/:id/status ───────────────────────────────

  @Patch(':id/status')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true })
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update order status (Admin/System only)' })
  async updateStatus(
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-role') role: string,
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    // Basic auth check — real system would use a guard
    if (role !== 'ADMIN' && role !== 'SYSTEM') {
      throw new Error('Forbidden'); // Normally a ForbiddenException
    }
    return this.orderService.updateStatus(orderId, actorId, dto);
  }

  // ── POST /orders/:id/cancel ────────────────────────────────

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Cancel a pending order' })
  async cancelOrder(@Headers('x-user-id') userId: string, @Param('id') orderId: string) {
    return this.orderService.cancelOrder(orderId, userId);
  }
}
