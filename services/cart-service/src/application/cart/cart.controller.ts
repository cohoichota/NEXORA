import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';

import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, MergeCartDto } from './cart.dto';

// ────────────────────────────────────────────────────────────
// NOTE: Auth is JWT-verified at the API Gateway layer.
// The gateway forwards x-user-id header to this service.
// For direct dev testing, pass x-user-id: <userId> manually.
// ────────────────────────────────────────────────────────────

@ApiTags('cart')
@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ── GET /cart ──────────────────────────────────────────────
  // Authenticated user cart

  @Get('cart')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true, description: 'Injected by API Gateway' })
  @ApiOperation({ summary: 'Get cart for authenticated user' })
  async getCart(@Headers('x-user-id') userId: string) {
    return this.cartService.getCartSummary(userId);
  }

  // ── POST /cart/items ───────────────────────────────────────

  @Post('cart/items')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiOperation({ summary: 'Add an item to the cart' })
  @ApiResponse({ status: 201, description: 'Updated cart returned' })
  async addItem(
    @Headers('x-user-id') userId: string,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addItem(userId, dto);
  }

  // ── PATCH /cart/items/:itemId ──────────────────────────────

  @Patch('cart/items/:itemId')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiParam({ name: 'itemId', description: 'variantId or productId' })
  @ApiOperation({ summary: 'Update item quantity (0 = remove)' })
  async updateItem(
    @Headers('x-user-id') userId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(userId, itemId, dto);
  }

  // ── DELETE /cart/items/:itemId ─────────────────────────────

  @Delete('cart/items/:itemId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiParam({ name: 'itemId' })
  @ApiOperation({ summary: 'Remove an item from the cart' })
  async removeItem(
    @Headers('x-user-id') userId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(userId, itemId);
  }

  // ── DELETE /cart ───────────────────────────────────────────

  @Delete('cart')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiOperation({ summary: 'Clear entire cart' })
  async clearCart(@Headers('x-user-id') userId: string) {
    await this.cartService.clearCart(userId);
  }

  // ── POST /cart/merge ───────────────────────────────────────
  // Called after login — merges guest cart into user cart

  @Post('cart/merge')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiOperation({ summary: 'Merge guest cart into user cart (called after login)' })
  async mergeCart(
    @Headers('x-user-id') userId: string,
    @Body() dto: MergeCartDto,
  ) {
    return this.cartService.mergeCart(userId, dto);
  }

  // ── Guest cart endpoints ───────────────────────────────────

  @Get('cart/guest/:guestId')
  @ApiParam({ name: 'guestId' })
  @ApiOperation({ summary: 'Get guest cart (unauthenticated)' })
  async getGuestCart(@Param('guestId') guestId: string) {
    return this.cartService.getGuestCart(guestId);
  }

  @Post('cart/guest/:guestId/items')
  @ApiParam({ name: 'guestId' })
  @ApiOperation({ summary: 'Add item to guest cart' })
  async addGuestItem(
    @Param('guestId') guestId: string,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addGuestItem(guestId, dto);
  }
}
