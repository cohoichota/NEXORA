import { Module } from '@nestjs/common';
import { KafkaEventConsumer } from './kafka-event.consumer';

@Module({
  controllers: [KafkaEventConsumer],
})
export class ConsumersModule {}
