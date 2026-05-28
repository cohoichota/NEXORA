import { randomBytes } from 'crypto';

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User, UserRole } from '../../domain/entities/user.entity';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly BCRYPT_ROUNDS = 12;
  private readonly ACCESS_TOKEN_TTL = '15m';
  private readonly REFRESH_TOKEN_TTL_DAYS = 30;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // ── Register ───────────────────────────────────────────────

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, this.BCRYPT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        role: dto.role ?? UserRole.BUYER,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    this.logger.log(`New user registered: ${user.email} (${user.id})`);

    const domainUser = User.fromPrisma({ ...user, role: user.role as UserRole });
    return this.issueTokens(domainUser);
  }

  // ── Login ──────────────────────────────────────────────────

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string): Promise<AuthResponseDto> {
    const record = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!record || !record.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, record.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const domainUser = User.fromPrisma({ ...record, role: record.role as UserRole });
    if (!domainUser.canLogin()) {
      throw new UnauthorizedException('Account is suspended');
    }

    this.logger.log(`User logged in: ${record.email}`);
    return this.issueTokens(domainUser, ipAddress, userAgent);
  }

  // ── Refresh Token ──────────────────────────────────────────

  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (session.revokedAt) {
      this.logger.warn(
        `Token replay detected for user ${session.userId}. Revoking all active sessions.`,
      );
      await this.logoutAll(session.userId);
      throw new UnauthorizedException('Security violation: Please log in again');
    }

    // Rotate refresh token (invalidate old, issue new)
    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });

    const domainUser = User.fromPrisma({ ...session.user, role: session.user.role as UserRole });
    return this.issueTokens(domainUser);
  }

  // ── Logout ─────────────────────────────────────────────────

  async logout(refreshToken: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { refreshToken },
      data: { revokedAt: new Date() },
    });
  }

  async logoutAll(userId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  // ── Get current user ───────────────────────────────────────

  async getMe(userId: string): Promise<UserResponseDto> {
    const record = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!record) throw new NotFoundException('User not found');
    const user = User.fromPrisma({ ...record, role: record.role as UserRole });
    return user.toPublicProfile();
  }

  // ── Validate JWT payload (for Passport strategy) ───────────

  async validateUser(userId: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!record || !record.isActive) return null;
    return User.fromPrisma({ ...record, role: record.role as UserRole });
  }

  // ── Private helpers ────────────────────────────────────────

  private async issueTokens(
    user: User,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<AuthResponseDto> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.ACCESS_TOKEN_TTL,
    });

    const refreshToken = randomBytes(64).toString('hex');
    const expiresAt = new Date(Date.now() + this.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: user.toPublicProfile(),
    };
  }
}
