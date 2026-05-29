import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUrl, IsBoolean, MaxLength } from 'class-validator';

// ── Enums ─────────────────────────────────────────────────────────

export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

// ── Update Profile ─────────────────────────────────────────────────

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Jane', maxLength: 64 })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', maxLength: 64 })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  lastName?: string;

  @ApiPropertyOptional({
    example: 'janedoe',
    maxLength: 30,
    description: 'Unique display name / username',
  })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  displayName?: string;

  @ApiPropertyOptional({ example: 'https://cdn.nexora.dev/avatars/jane.jpg' })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({ example: '+84912345678' })
  @IsString()
  @IsOptional()
  phone?: string;
}

// ── Address ───────────────────────────────────────────────────────

export class AddressDto {
  @ApiProperty({ example: 'Home' })
  @IsString()
  label: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  recipientName: string;

  @ApiProperty({ example: '+84912345678' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  line1: string;

  @ApiPropertyOptional({ example: 'Apt 4B' })
  @IsString()
  @IsOptional()
  line2?: string;

  @ApiProperty({ example: 'Ho Chi Minh City' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'Ho Chi Minh' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: '700000' })
  @IsString()
  postalCode: string;

  @ApiProperty({ example: 'VN', description: 'ISO 3166-1 alpha-2 country code' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: true, description: 'Mark as default shipping address' })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(AddressDto) {}

// ── Query ─────────────────────────────────────────────────────────

export class UserQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (1-based)' })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: 'jane', description: 'Search by name or email' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Responses ─────────────────────────────────────────────────────

export class AddressResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() label: string;
  @ApiProperty() recipientName: string;
  @ApiProperty() phone: string;
  @ApiProperty() line1: string;
  @ApiPropertyOptional() line2?: string;
  @ApiProperty() city: string;
  @ApiPropertyOptional() state?: string;
  @ApiProperty() postalCode: string;
  @ApiProperty() country: string;
  @ApiProperty() isDefault: boolean;
  @ApiProperty() createdAt: Date;
}

export class UserProfileResponseDto {
  @ApiProperty({ example: 'uuid-here' })
  id: string;

  @ApiProperty({ example: 'jane@example.com' })
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiPropertyOptional({ example: 'Jane' })
  firstName?: string | null;

  @ApiPropertyOptional({ example: 'Doe' })
  lastName?: string | null;

  @ApiPropertyOptional({ example: 'janedoe' })
  displayName?: string | null;

  @ApiPropertyOptional()
  avatar?: string | null;

  @ApiPropertyOptional()
  phone?: string | null;

  @ApiProperty({ example: true })
  emailVerified: boolean;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ type: [AddressResponseDto] })
  addresses: AddressResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaginatedUsersResponseDto {
  @ApiProperty({ type: [UserProfileResponseDto] })
  data: UserProfileResponseDto[];

  @ApiProperty({ example: 150 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
