import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT } from '../../infrastructure/kafka/kafka.module';
import { OutboxStatus } from '@prisma/client';

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
        } catch (error: any) {
          this.logger.error(`Failed to process outbox message ${msg.id}: ${error.message}`);
          await this.prisma.outboxMessage.update({
            where: { id: msg.id },
            data: { 
              status: OutboxStatus.FAILED,
              error: error.message || 'Unknown error',
            },
          });
        }
      }
    } catch (error: any) {
      this.logger.error(`Error polling outbox: ${error.message}`);
    } finally {
      this.isPolling = false;
    }
  }
}
