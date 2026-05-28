import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const payload = this.jwtService.verify<{ sub: string; role: string; email: string }>(token);

        // Inject user context into headers for downstream services
        req.headers['x-user-id'] = payload.sub;
        req.headers['x-user-role'] = payload.role;
        req.headers['x-user-email'] = payload.email;
      } catch (err) {
        this.logger.warn(`Invalid JWT token: ${(err as Error).message}`);
        // We don't throw an error here immediately. Some routes might be public.
        // It's the responsibility of the downstream service to enforce auth
        // by requiring the 'x-user-id' header if the route is protected.
      }
    }

    next();
  }
}
