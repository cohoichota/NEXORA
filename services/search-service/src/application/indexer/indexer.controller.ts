import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OpensearchService } from '../../infrastructure/opensearch/opensearch.service';
import { KafkaTopics, ProductEventTypes } from '@nexora/kafka-events';

@Controller()
export class IndexerController {
  private readonly logger = new Logger(IndexerController.name);

  constructor(private readonly opensearchService: OpensearchService) {}

  @EventPattern(KafkaTopics.PRODUCTS)
  async handleProductEvent(@Payload() message: any) {
    if (!message || !message.value) return;

    const event = message.value;
    
    try {
      switch (event.type) {
        case ProductEventTypes.PRODUCT_CREATED:
        case ProductEventTypes.PRODUCT_UPDATED:
          await this.opensearchService.indexProduct(event.payload);
          this.logger.log(`Processed ${event.type} for ${event.payload.id}`);
          break;
        case ProductEventTypes.PRODUCT_DELETED:
          await this.opensearchService.deleteProduct(event.payload.id);
          this.logger.log(`Processed ${event.type} for ${event.payload.id}`);
          break;
        default:
          this.logger.warn(`Unknown product event type: ${event.type}`);
      }
    } catch (error) {
      this.logger.error(`Error processing event ${event.type}`, error);
    }
  }
}
