/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';

import {
  SendNotificationDto,
  UpdatePreferencesDto,
  NotificationResponseDto,
  NotificationPreferencesResponseDto,
} from './notifications.dto';

// ────────────────────────────────────────────────────────────────
// NOTE: Notifications are primarily sent via Kafka event consumers.
// These REST endpoints support admin dispatch, history viewing,
// and user preference management.
// ────────────────────────────────────────────────────────────────

@ApiTags('notifications')
@Controller('notifications')
@ApiBearerAuth('JWT')
export class NotificationController {
  // ── POST /notifications/send ───────────────────────────────────

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send a notification directly (Admin)',
    description:
      'Dispatches a notification to a user via specified channels. ' +
      'Normally called internally; exposed here for admin/testing purposes.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiHeader({ name: 'x-user-role', required: true, description: 'Must be ADMIN' })
  @ApiResponse({
    status: 200,
    description: 'Notification dispatched',
    type: [NotificationResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  async send(
    @Headers('x-user-role') _role: string,
    @Body() _dto: SendNotificationDto,
  ): Promise<NotificationResponseDto[]> {
    // TODO: notificationService.send(_dto)
    return [];
  }

  // ── GET /notifications ─────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'Get notification history for authenticated user',
    description: 'Returns paginated notification history for the requesting user.',
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'read', required: false, type: Boolean, description: 'Filter by read status' })
  @ApiResponse({ status: 200, description: 'Notification list', type: [NotificationResponseDto] })
  async findAll(
    @Headers('x-user-id') _userId: string,
    @Query('page') _page = 1,
    @Query('limit') _limit = 20,
    @Query('read') _read?: boolean,
  ): Promise<NotificationResponseDto[]> {
    // TODO: notificationService.findByUser(_userId, { _page, _limit, _read })
    return [];
  }

  // ── PATCH /notifications/:id/read ─────────────────────────────

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification UUID' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Marked as read', type: NotificationResponseDto })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async markRead(
    @Headers('x-user-id') _userId: string,
    @Param('id') _id: string,
  ): Promise<NotificationResponseDto> {
    // TODO: notificationService.markRead(_userId, _id)
    return {} as NotificationResponseDto;
  }

  // ── PATCH /notifications/read-all ─────────────────────────────

  @Patch('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'All marked as read' })
  async markAllRead(@Headers('x-user-id') _userId: string): Promise<{ updated: number }> {
    // TODO: notificationService.markAllRead(_userId)
    return { updated: 0 };
  }
}

// ── Preferences Controller ─────────────────────────────────────

@ApiTags('preferences')
@Controller('notifications/preferences')
@ApiBearerAuth('JWT')
export class PreferencesController {
  // ── GET /notifications/preferences ────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Get notification preferences for the authenticated user' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({
    status: 200,
    description: 'User notification preferences',
    type: NotificationPreferencesResponseDto,
  })
  async getPreferences(
    @Headers('x-user-id') _userId: string,
  ): Promise<NotificationPreferencesResponseDto> {
    // TODO: notificationService.getPreferences(_userId)
    return {} as NotificationPreferencesResponseDto;
  }

  // ── PATCH /notifications/preferences ──────────────────────────

  @Patch()
  @ApiOperation({ summary: 'Update notification preferences' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({
    status: 200,
    description: 'Updated preferences',
    type: NotificationPreferencesResponseDto,
  })
  async updatePreferences(
    @Headers('x-user-id') _userId: string,
    @Body() _dto: UpdatePreferencesDto,
  ): Promise<NotificationPreferencesResponseDto> {
    // TODO: notificationService.updatePreferences(_userId, _dto)
    return {} as NotificationPreferencesResponseDto;
  }
}
