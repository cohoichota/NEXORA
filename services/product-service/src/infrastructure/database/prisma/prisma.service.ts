import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

import { PrismaClient } from '../../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to database...');
    await this.$connect();
    this.logger.log('Database connected');

    // Log slow queries in development
    if (process.env.NODE_ENV !== 'production') {
      (
        this.$on as unknown as (
          event: string,
          listener: (event: { duration: number; query: string }) => void,
        ) => void
      )('query', (event: { duration: number; query: string }) => {
        if (event.duration > 200) {
          this.logger.warn(`Slow query (${event.duration}ms): ${event.query}`);
        }
      });
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database...');
    await this.$disconnect();
  }

  /** Helper for soft deletes — adds deletedAt timestamp */
  async softDelete(model: string, id: string): Promise<void> {
    const delegate = (
      this as unknown as Record<string, { update: (args: unknown) => Promise<unknown> }>
    )[model];
    if (delegate) {
      await delegate.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }
  }
}
