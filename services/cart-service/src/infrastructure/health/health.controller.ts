import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    // private readonly http: HttpHealthIndicator,
    // private readonly db: PrismaHealthIndicator,
    // private readonly redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // () => this.db.isHealthy('database'),
      // () => this.redis.isHealthy('redis'),
    ]);
  }

  @Get('ready')
  ready() {
    return {
      status: 'ok',
      service: 'auth-service',
      version: process.env.npm_package_version ?? '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    };
  }
}
