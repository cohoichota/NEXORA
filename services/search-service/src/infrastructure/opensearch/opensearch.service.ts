import { GoogleGenAI } from '@google/genai';
import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpensearchService implements OnModuleInit {
  private readonly logger = new Logger(OpensearchService.name);
  private readonly indexName = 'products';
  private readonly ai = new GoogleGenAI({});

  constructor(@Inject('OPENSEARCH_CLIENT') private readonly client: Client) {}

  async onModuleInit() {
    try {
      const { body: exists } = await this.client.indices.exists({ index: this.indexName });
      if (!exists) {
        await this.client.indices.create({
          index: this.indexName,
          body: {
            settings: {
              'index.knn': true,
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
                embedding: {
                  type: 'knn_vector',
                  dimension: 768,
                  method: {
                    name: 'hnsw',
                    space_type: 'cosinesimil',
                    engine: 'nmslib',
                  },
                },
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

  async generateEmbedding(text: string): Promise<number[]> {
    if (!process.env.GEMINI_API_KEY) {
      // Mock embedding if no API key is provided
      return Array(768)
        .fill(0)
        .map(() => Math.random() - 0.5);
    }

    try {
      const response = await this.ai.models.embedContent({
        model: 'text-embedding-004',
        contents: text,
      });
      if (!response.embeddings || response.embeddings.length === 0) {
        throw new Error('Gemini returned an empty embedding array');
      }
      return response.embeddings[0].values || [];
    } catch (error) {
      this.logger.error('Failed to generate embedding', error);
      return Array(768)
        .fill(0)
        .map(() => Math.random() - 0.5);
    }
  }

  async indexProduct(
    product: Record<string, unknown> & {
      id: string;
      name: string;
      description?: string;
      tags?: string[];
    },
  ) {
    try {
      const textToEmbed = `${product.name} ${product.description || ''} ${product.tags?.join(' ') || ''}`;
      const embedding = await this.generateEmbedding(textToEmbed);

      await this.client.index({
        index: this.indexName,
        id: product.id,
        body: {
          ...product,
          embedding,
        },
        refresh: true,
      });
      this.logger.log(`Indexed product with embedding: ${product.id}`);
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
    } catch (error: unknown) {
      const err = error as { meta?: { statusCode: number } };
      if (err.meta?.statusCode === 404) return; // Ignore if already not found
      this.logger.error(`Failed to delete product: ${id}`, error);
    }
  }

  async searchProducts(
    query: string,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    aiSearch = false,
  ) {
    const filter: Record<string, unknown>[] = [{ term: { isAvailable: true } }];
    if (categoryId) filter.push({ term: { categoryId } });
    if (minPrice !== undefined || maxPrice !== undefined) {
      const range: Record<string, number> = {};
      if (minPrice !== undefined) range.gte = minPrice;
      if (maxPrice !== undefined) range.lte = maxPrice;
      filter.push({ range: { price: range } });
    }

    const searchBody: {
      query: { bool: { filter: Record<string, unknown>[]; must?: Record<string, unknown> } };
    } = {
      query: {
        bool: { filter },
      },
    };

    if (query) {
      if (aiSearch) {
        const queryEmbedding = await this.generateEmbedding(query);
        searchBody.query.bool.must = {
          knn: {
            embedding: {
              vector: queryEmbedding,
              k: 5,
            },
          },
        };
      } else {
        searchBody.query.bool.must = {
          multi_match: {
            query,
            fields: ['name^3', 'description', 'tags^2'],
            fuzziness: 'AUTO',
          },
        };
      }
    } else {
      searchBody.query.bool.must = { match_all: {} };
    }

    const { body } = await this.client.search({
      index: this.indexName,
      body: searchBody,
    });

    return (body.hits.hits as Array<{ _source: Record<string, unknown> }>).map(
      (hit) => hit._source,
    );
  }

  // Generate Chat Response using RAG
  async chat(userMessage: string) {
    // 1. Semantic Search for context
    const products = await this.searchProducts(userMessage, undefined, undefined, undefined, true);

    // 2. Construct context string
    const context = products
      .slice(0, 3)
      .map(
        (p: { name: string; price: number; description?: string }) =>
          `- ${p.name} ($${p.price}): ${p.description || 'No description'}`,
      )
      .join('\n');

    // 3. Prompt LLM
    if (!process.env.GEMINI_API_KEY) {
      return `[Mock AI Response]: Based on your query, here are some products you might like:\n${context}`;
    }

    try {
      const prompt = `You are Nexora, a helpful AI shopping assistant. Use the following product catalog context to answer the user's question. If the user asks for products, recommend from the context below. Keep it concise, friendly, and output in markdown format.\n\nContext:\n${context}\n\nUser Question: ${userMessage}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      this.logger.error('Failed to generate chat response', error);
      return 'Sorry, I am having trouble connecting to my brain right now.';
    }
  }
}
