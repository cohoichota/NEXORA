import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
  UserResponseDto,
} from './auth.dto';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import type { User } from '../../domain/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ── POST /auth/register ───────────────────────────────────

  @Post('register')
  @Throttle({ auth: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.register(dto);
    this.setRefreshCookie(res, result.refreshToken);
    return result;
  }

  // ── POST /auth/login ──────────────────────────────────────

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ auth: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Log in with email and password' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(
      dto,
      req.ip ?? undefined,
      req.headers['user-agent'] ?? undefined,
    );
    this.setRefreshCookie(res, result.refreshToken);
    return result;
  }

  // ── POST /auth/refresh ────────────────────────────────────

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    // Accept from body OR from httpOnly cookie
    const token = dto.refreshToken ?? (req.cookies as Record<string, string>)?.['refreshToken'];
    const result = await this.authService.refresh(token);
    this.setRefreshCookie(res, result.refreshToken);
    return result;
  }

  // ── POST /auth/logout ─────────────────────────────────────

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke the refresh token' })
  async logout(
    @Body() dto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const token = dto.refreshToken ?? (req.cookies as Record<string, string>)?.['refreshToken'];
    if (token) await this.authService.logout(token);
    this.clearRefreshCookie(res);
  }

  // ── GET /auth/me ──────────────────────────────────────────

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the currently authenticated user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async me(@CurrentUser() user: User): Promise<UserResponseDto> {
    return this.authService.getMe(user.id);
  }

  // ── Cookie helpers ────────────────────────────────────────

  private setRefreshCookie(res: Response, token: string): void {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/auth/refresh',
    });
  }

  private clearRefreshCookie(res: Response): void {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
  }
}
