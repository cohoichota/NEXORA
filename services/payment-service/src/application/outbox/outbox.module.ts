import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { KafkaModule } from '../../infrastructure/kafka/kafka.module';

import { OutboxPollerService } from './outbox.service';

@Module({
  imports: [PrismaModule, KafkaModule],
  providers: [OutboxPollerService],
})
export class OutboxModule {}
