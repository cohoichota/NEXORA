/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import type { Request } from 'express';

import {
  InitiatePaymentDto,
  RefundPaymentDto,
  PaymentQueryDto,
  PaymentResponseDto,
  WebhookResponseDto,
} from './payment.dto';

// ────────────────────────────────────────────────────────────────
// NOTE: Payments are primarily event-driven (Kafka).
// The REST endpoints here support manual/admin flows and webhooks.
// ────────────────────────────────────────────────────────────────

@ApiTags('payments')
@Controller('payments')
@ApiBearerAuth('JWT')
export class PaymentController {
  // ── POST /payments ─────────────────────────────────────────────

  @Post()
  @ApiOperation({
    summary: 'Initiate a payment for an order',
    description:
      'Creates a payment intent with the specified provider (Stripe/PayPal). ' +
      'For event-driven flows, this is triggered automatically by order-service via Kafka.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 201, description: 'Payment initiated', type: PaymentResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid payment data' })
  @ApiResponse({ status: 409, description: 'Payment already exists for this order' })
  async initiatePayment(
    @Headers('x-user-id') _userId: string,
    @Body() _dto: InitiatePaymentDto,
  ): Promise<PaymentResponseDto> {
    // TODO: paymentService.initiatePayment(_userId, _dto)
    return {} as PaymentResponseDto;
  }

  // ── GET /payments ──────────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'List payments (Admin)',
    description: 'Returns a paginated list of all payment records.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'Must be ADMIN' })
  @ApiResponse({ status: 200, description: 'Payment list', type: [PaymentResponseDto] })
  async findAll(@Query() _query: PaymentQueryDto): Promise<PaymentResponseDto[]> {
    // TODO: paymentService.findAll(_query)
    return [];
  }

  // ── GET /payments/:id ──────────────────────────────────────────

  @Get(':id')
  @ApiOperation({ summary: 'Get payment details by ID' })
  @ApiParam({ name: 'id', description: 'Payment UUID' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Payment detail', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async findOne(@Param('id') _id: string): Promise<PaymentResponseDto> {
    // TODO: paymentService.findById(_id)
    return {} as PaymentResponseDto;
  }

  // ── GET /payments/order/:orderId ───────────────────────────────

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payment for a specific order' })
  @ApiParam({ name: 'orderId', description: 'Order UUID' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Payment for the order', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'No payment found for this order' })
  async findByOrder(@Param('orderId') _orderId: string): Promise<PaymentResponseDto> {
    // TODO: paymentService.findByOrderId(_orderId)
    return {} as PaymentResponseDto;
  }

  // ── POST /payments/:id/refund ──────────────────────────────────

  @Post(':id/refund')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refund a payment (Admin)',
    description: 'Issues a full or partial refund via the payment provider.',
  })
  @ApiParam({ name: 'id', description: 'Payment UUID' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'Must be ADMIN' })
  @ApiResponse({ status: 200, description: 'Refund processed', type: PaymentResponseDto })
  @ApiResponse({ status: 400, description: 'Refund amount exceeds original payment' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async refund(
    @Param('id') _id: string,
    @Body() _dto: RefundPaymentDto,
  ): Promise<PaymentResponseDto> {
    // TODO: paymentService.refund(_id, _dto)
    return {} as PaymentResponseDto;
  }

  // ── POST /payments/webhook/stripe ──────────────────────────────

  @Post('webhook/stripe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Stripe webhook endpoint',
    description:
      'Receives and verifies Stripe webhook events. The raw request body is required for signature verification.',
  })
  @ApiBody({ schema: { type: 'object', description: 'Raw Stripe webhook payload' } })
  @ApiResponse({ status: 200, description: 'Webhook received', type: WebhookResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid Stripe signature' })
  async stripeWebhook(@Req() _req: RawBodyRequest<Request>): Promise<WebhookResponseDto> {
    // TODO: paymentService.handleStripeWebhook(_req.rawBody, _req.headers['stripe-signature'])
    return { received: true };
  }

  // ── POST /payments/webhook/paypal ──────────────────────────────

  @Post('webhook/paypal')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'PayPal webhook endpoint',
    description: 'Receives and verifies PayPal IPN/webhook events.',
  })
  @ApiBody({ schema: { type: 'object', description: 'PayPal webhook payload' } })
  @ApiResponse({ status: 200, description: 'Webhook received', type: WebhookResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid PayPal signature' })
  async paypalWebhook(@Req() _req: Request): Promise<WebhookResponseDto> {
    // TODO: paymentService.handlePaypalWebhook(_req.body, _req.headers)
    return { received: true };
  }
}
