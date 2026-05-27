import { User, UserRole } from '../entities/user.entity';

// ── User Repository Interface (Domain contract) ───────────────
// Implemented in infrastructure layer. Allows domain to be
// framework-agnostic and easily testable.

export interface CreateUserInput {
  email: string;
  passwordHash?: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
  update(id: string, data: Partial<CreateUserInput & { emailVerified: boolean; isActive: boolean }>): Promise<User>;
  delete(id: string): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}

// ── Session Repository Interface ──────────────────────────────

export interface CreateSessionInput {
  userId: string;
  refreshToken: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
}

export interface ISessionRepository {
  create(input: CreateSessionInput): Promise<{ id: string }>;
  findByRefreshToken(token: string): Promise<{
    id: string;
    userId: string;
    expiresAt: Date;
    revokedAt: Date | null;
  } | null>;
  revokeByToken(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}
