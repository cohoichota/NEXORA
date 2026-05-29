import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID, IsBoolean, IsEmail, IsArray } from 'class-validator';

// ── Enums ─────────────────────────────────────────────────────────

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

export enum NotificationType {
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_SHIPPED = 'ORDER_SHIPPED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  LOW_STOCK_ALERT = 'LOW_STOCK_ALERT',
  WELCOME = 'WELCOME',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PROMO = 'PROMO',
  CUSTOM = 'CUSTOM',
}

// ── DTOs ─────────────────────────────────────────────────────────

export class SendNotificationDto {
  @ApiProperty({
    example: 'user-uuid',
    description: 'Target user UUID. Leave blank to use email/phone directly.',
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'jane@example.com', description: 'Direct email (if no userId)' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ORDER_CONFIRMED })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ enum: NotificationChannel, isArray: true, example: [NotificationChannel.EMAIL] })
  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  channels: NotificationChannel[];

  @ApiPropertyOptional({
    example: { orderId: 'order-uuid', total: 99.99 },
    description: 'Template variables to inject into the notification body',
  })
  data?: Record<string, unknown>;
}

export class UpdatePreferencesDto {
  @ApiPropertyOptional({ example: true, description: 'Receive email notifications' })
  @IsBoolean()
  @IsOptional()
  emailEnabled?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Receive SMS notifications' })
  @IsBoolean()
  @IsOptional()
  smsEnabled?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Receive push notifications' })
  @IsBoolean()
  @IsOptional()
  pushEnabled?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Receive in-app notifications' })
  @IsBoolean()
  @IsOptional()
  inAppEnabled?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Receive promotional / marketing emails' })
  @IsBoolean()
  @IsOptional()
  marketingEnabled?: boolean;
}

// ── Responses ─────────────────────────────────────────────────────

export class NotificationResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty({ enum: NotificationType }) type: NotificationType;
  @ApiProperty({ enum: NotificationChannel }) channel: NotificationChannel;
  @ApiProperty({ example: 'Your order #12345 has been confirmed!' }) subject: string;
  @ApiProperty({ example: 'Hi Jane, your order is confirmed...' }) body: string;
  @ApiProperty({ example: 'SENT' }) status: string;
  @ApiPropertyOptional() failureReason?: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() sentAt?: Date;
}

export class NotificationPreferencesResponseDto {
  @ApiProperty() userId: string;
  @ApiProperty() emailEnabled: boolean;
  @ApiProperty() smsEnabled: boolean;
  @ApiProperty() pushEnabled: boolean;
  @ApiProperty() inAppEnabled: boolean;
  @ApiProperty() marketingEnabled: boolean;
  @ApiProperty() updatedAt: Date;
}
