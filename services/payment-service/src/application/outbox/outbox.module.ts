import { Module } from '@nestjs/common';
import { OutboxPollerService } from './outbox.service';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { KafkaModule } from '../../infrastructure/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  providers: [OutboxPollerService],
})
export class OutboxModule {}
