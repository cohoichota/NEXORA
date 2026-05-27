import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpensearchService implements OnModuleInit {
  private readonly logger = new Logger(OpensearchService.name);
  private readonly indexName = 'products';

  constructor(@Inject('OPENSEARCH_CLIENT') private readonly client: Client) {}

  async onModuleInit() {
    try {
      const { body: exists } = await this.client.indices.exists({ index: this.indexName });
      if (!exists) {
        await this.client.indices.create({
          index: this.indexName,
          body: {
            settings: {
              analysis: {
                analyzer: {
                  product_analyzer: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase', 'asciifolding'],
                  },
                },
              },
            },
            mappings: {
              properties: {
                id: { type: 'keyword' },
                name: { type: 'text', analyzer: 'product_analyzer' },
                description: { type: 'text', analyzer: 'product_analyzer' },
                price: { type: 'double' },
                categoryId: { type: 'keyword' },
                tags: { type: 'keyword' },
                isAvailable: { type: 'boolean' },
                createdAt: { type: 'date' },
              },
            },
          },
        });
        this.logger.log(`Created index: ${this.indexName}`);
      } else {
        this.logger.log(`Index ${this.indexName} already exists`);
      }
    } catch (error) {
      this.logger.error('Failed to initialize OpenSearch index', error);
    }
  }

  async indexProduct(product: any) {
    try {
      await this.client.index({
        index: this.indexName,
        id: product.id,
        body: product,
        refresh: true,
      });
      this.logger.log(`Indexed product: ${product.id}`);
    } catch (error) {
      this.logger.error(`Failed to index product: ${product.id}`, error);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.client.delete({
        index: this.indexName,
        id,
        refresh: true,
      });
      this.logger.log(`Deleted product: ${id}`);
    } catch (error: any) {
      if (error.meta?.statusCode === 404) return; // Ignore if already not found
      this.logger.error(`Failed to delete product: ${id}`, error);
    }
  }

  async searchProducts(query: string, categoryId?: string, minPrice?: number, maxPrice?: number) {
    const must: any[] = [];
    
    if (query) {
      must.push({
        multi_match: {
          query,
          fields: ['name^3', 'description', 'tags^2'],
          fuzziness: 'AUTO',
        },
      });
    } else {
      must.push({ match_all: {} });
    }

    const filter: any[] = [{ term: { isAvailable: true } }];
    if (categoryId) filter.push({ term: { categoryId } });
    if (minPrice !== undefined || maxPrice !== undefined) {
      const range: any = {};
      if (minPrice !== undefined) range.gte = minPrice;
      if (maxPrice !== undefined) range.lte = maxPrice;
      filter.push({ range: { price: range } });
    }

    const { body } = await this.client.search({
      index: this.indexName,
      body: {
        query: {
          bool: { must, filter },
        },
      },
    });

    return body.hits.hits.map((hit: any) => hit._source);
  }
}
