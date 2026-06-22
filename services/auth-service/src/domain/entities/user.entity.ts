// ── User Domain Entity ────────────────────────────────────────
// Pure business logic, no framework dependencies

export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export interface UserProps {
  id: string;
  email: string;
  passwordHash?: string | null;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  avatar?: string | null;
  phone?: string | null;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  constructor(private readonly props: UserProps) {}

  get id() {
    return this.props.id;
  }
  get email() {
    return this.props.email;
  }
  get passwordHash() {
    return this.props.passwordHash;
  }
  get role() {
    return this.props.role;
  }
  get firstName() {
    return this.props.firstName;
  }
  get lastName() {
    return this.props.lastName;
  }
  get displayName() {
    return (
      this.props.displayName ?? `${this.props.firstName ?? ''} ${this.props.lastName ?? ''}`.trim()
    );
  }
  get avatar() {
    return this.props.avatar;
  }
  get phone() {
    return this.props.phone;
  }
  get emailVerified() {
    return this.props.emailVerified;
  }
  get isActive() {
    return this.props.isActive;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  // ── Business rules ──────────────────────────────────────────

  canLogin(): boolean {
    return this.props.isActive;
  }

  isAdmin(): boolean {
    return this.props.role === UserRole.ADMIN;
  }

  isSeller(): boolean {
    return this.props.role === UserRole.SELLER;
  }

  hasPassword(): boolean {
    return !!this.props.passwordHash;
  }

  toPublicProfile() {
    return {
      id: this.props.id,
      email: this.props.email,
      role: this.props.role,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      displayName: this.displayName,
      avatar: this.props.avatar,
      emailVerified: this.props.emailVerified,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
    };
  }

  static fromPrisma(data: UserProps): User {
    return new User(data);
  }
}
