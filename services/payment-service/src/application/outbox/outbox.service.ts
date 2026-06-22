import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

import { OutboxStatus } from '../../generated/prisma';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { KAFKA_CLIENT } from '../../infrastructure/kafka/kafka.module';

@Injectable()
export class OutboxPollerService {
  private readonly logger = new Logger(OutboxPollerService.name);
  private isPolling = false;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async pollOutboxMessages() {
    if (this.isPolling) return;
    this.isPolling = true;

    try {
      const pendingMessages = await this.prisma.outboxMessage.findMany({
        where: { status: OutboxStatus.PENDING },
        take: 50,
        orderBy: { createdAt: 'asc' },
      });

      if (pendingMessages.length === 0) {
        this.isPolling = false;
        return;
      }

      this.logger.debug(`Found ${pendingMessages.length} pending outbox messages.`);

      for (const msg of pendingMessages) {
        try {
          this.kafkaClient.emit(msg.topic, {
            key: msg.id,
            value: msg.payload,
          });

          await this.prisma.outboxMessage.update({
            where: { id: msg.id },
            data: { status: OutboxStatus.PROCESSED },
          });
        } catch (error: unknown) {
          const err = error as Error;
          this.logger.error(`Failed to process outbox message ${msg.id}: ${err.message}`);
          await this.prisma.outboxMessage.update({
            where: { id: msg.id },
            data: {
              status: OutboxStatus.FAILED,
              error: err.message || 'Unknown error',
            },
          });
        }
      }
    } catch (error: unknown) {
      this.logger.error(`Error polling outbox: ${(error as Error).message}`);
    } finally {
      this.isPolling = false;
    }
  }
}
