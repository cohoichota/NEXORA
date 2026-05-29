import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsNumber, IsString, IsOptional, IsEnum, Min } from 'class-validator';

// ── Enums ─────────────────────────────────────────────────────────

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentProvider {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  MOCK = 'MOCK',
}

// ── DTOs ─────────────────────────────────────────────────────────

export class InitiatePaymentDto {
  @ApiProperty({ example: 'order-uuid', description: 'Order UUID to pay for' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ example: 99.99, description: 'Amount to charge' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ example: 'USD', description: 'ISO 4217 currency code' })
  @IsString()
  currency: string;

  @ApiProperty({ enum: PaymentProvider, example: PaymentProvider.STRIPE })
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @ApiPropertyOptional({
    example: 'pm_card_visa',
    description: 'Stripe payment method ID or PayPal order ID',
  })
  @IsString()
  @IsOptional()
  paymentMethodId?: string;
}

export class RefundPaymentDto {
  @ApiProperty({ example: 49.99, description: 'Amount to refund. Leave blank for full refund.' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsString()
  @IsOptional()
  reason?: string;
}

export class PaymentQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiPropertyOptional({ example: 'order-uuid' })
  @IsUUID()
  @IsOptional()
  orderId?: string;
}

// ── Responses ─────────────────────────────────────────────────────

export class PaymentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() orderId: string;
  @ApiProperty() userId: string;
  @ApiProperty({ example: 99.99 }) amount: number;
  @ApiProperty({ example: 'USD' }) currency: string;
  @ApiProperty({ enum: PaymentProvider }) provider: PaymentProvider;
  @ApiProperty({ enum: PaymentStatus }) status: PaymentStatus;
  @ApiPropertyOptional({ example: 'pi_stripe_intentId', description: 'Provider payment reference' })
  providerRef?: string;
  @ApiPropertyOptional({ description: 'Failure reason if status is FAILED' })
  failureReason?: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

export class WebhookResponseDto {
  @ApiProperty({ example: true }) received: boolean;
}
