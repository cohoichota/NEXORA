/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';

import {
  UpdateProfileDto,
  AddressDto,
  UpdateAddressDto,
  UserQueryDto,
  UserProfileResponseDto,
  AddressResponseDto,
  PaginatedUsersResponseDto,
} from '../dto/user.dto';

// ────────────────────────────────────────────────────────────────
// NOTE: JWT auth is verified at the API Gateway layer.
// The gateway injects `x-user-id` and `x-user-role` headers.
// For direct dev testing, pass these headers manually.
// ────────────────────────────────────────────────────────────────

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('JWT')
export class UserController {
  // ── GET /users (Admin) ─────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'List all users (Admin only)',
    description: 'Returns a paginated list of all users. Requires ADMIN role.',
  })
  @ApiHeader({ name: 'x-user-id', required: true, description: 'Injected by API Gateway' })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'Must be ADMIN' })
  @ApiResponse({ status: 200, description: 'Paginated user list', type: PaginatedUsersResponseDto })
  @ApiResponse({ status: 403, description: 'Forbidden – ADMIN role required' })
  async findAll(
    @Headers('x-user-role') role: string,
    @Query() query: UserQueryDto,
  ): Promise<PaginatedUsersResponseDto> {
    if (role !== 'ADMIN') throw new ForbiddenException('Admin role required');
    // TODO: inject UserService and call findAll(query)
    return { data: [], total: 0, page: query.page ?? 1, limit: query.limit ?? 20 };
  }

  // ── GET /users/me ──────────────────────────────────────────────

  @Get('me')
  @ApiOperation({
    summary: 'Get the currently authenticated user profile',
    description:
      'Returns the full profile of the user identified by the `x-user-id` gateway header.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'User profile', type: UserProfileResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getMe(@Headers('x-user-id') _userId: string): Promise<UserProfileResponseDto> {
    if (!_userId) throw new NotFoundException('User not found');
    // TODO: return userService.findById(_userId)
    return {} as UserProfileResponseDto;
  }

  // ── GET /users/:id ─────────────────────────────────────────────

  @Get(':id')
  @ApiOperation({ summary: 'Get a user profile by ID' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'User profile', type: UserProfileResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') _id: string): Promise<UserProfileResponseDto> {
    if (!_id) throw new NotFoundException('User not found');
    // TODO: return userService.findById(_id)
    return {} as UserProfileResponseDto;
  }

  // ── PATCH /users/me ────────────────────────────────────────────

  @Patch('me')
  @ApiOperation({
    summary: 'Update the authenticated user profile',
    description: 'Allows updating firstName, lastName, displayName, avatar, and phone.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Updated profile', type: UserProfileResponseDto })
  async updateMe(
    @Headers('x-user-id') _userId: string,
    @Body() _dto: UpdateProfileDto,
  ): Promise<UserProfileResponseDto> {
    // TODO: return userService.update(_userId, _dto)
    return {} as UserProfileResponseDto;
  }

  // ── DELETE /users/:id (Admin) ──────────────────────────────────

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deactivate / soft-delete a user (Admin only)' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'Must be ADMIN' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 204, description: 'User deactivated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async remove(@Headers('x-user-role') role: string, @Param('id') _id: string): Promise<void> {
    if (role !== 'ADMIN') throw new ForbiddenException('Admin role required');
    // TODO: userService.deactivate(_id)
  }

  // ── GET /users/me/addresses ────────────────────────────────────

  @Get('me/addresses')
  @ApiOperation({ summary: 'List shipping addresses for the authenticated user' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'List of addresses', type: [AddressResponseDto] })
  async getAddresses(@Headers('x-user-id') _userId: string): Promise<AddressResponseDto[]> {
    // TODO: return userService.getAddresses(_userId)
    return [];
  }

  // ── POST /users/me/addresses ───────────────────────────────────

  @Post('me/addresses')
  @ApiOperation({ summary: 'Add a new shipping address' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 201, description: 'Address created', type: AddressResponseDto })
  async addAddress(
    @Headers('x-user-id') _userId: string,
    @Body() _dto: AddressDto,
  ): Promise<AddressResponseDto> {
    // TODO: return userService.addAddress(_userId, _dto)
    return {} as AddressResponseDto;
  }

  // ── PATCH /users/me/addresses/:addressId ───────────────────────

  @Patch('me/addresses/:addressId')
  @ApiOperation({ summary: 'Update a shipping address' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiParam({ name: 'addressId', description: 'Address UUID' })
  @ApiResponse({ status: 200, description: 'Updated address', type: AddressResponseDto })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async updateAddress(
    @Headers('x-user-id') _userId: string,
    @Param('addressId') _addressId: string,
    @Body() _dto: UpdateAddressDto,
  ): Promise<AddressResponseDto> {
    // TODO: return userService.updateAddress(_userId, _addressId, _dto)
    return {} as AddressResponseDto;
  }

  // ── DELETE /users/me/addresses/:addressId ──────────────────────

  @Delete('me/addresses/:addressId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a shipping address' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiParam({ name: 'addressId', description: 'Address UUID' })
  @ApiResponse({ status: 204, description: 'Address removed' })
  async removeAddress(
    @Headers('x-user-id') _userId: string,
    @Param('addressId') _addressId: string,
  ): Promise<void> {
    // TODO: userService.removeAddress(_userId, _addressId)
  }
}
