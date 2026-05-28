import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

import { OpensearchService } from '../../infrastructure/opensearch/opensearch.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly opensearchService: OpensearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search products using OpenSearch' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query string' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category UUID' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price filter' })
  @ApiQuery({
    name: 'ai',
    required: false,
    description: 'Enable vector/semantic search (true/false)',
  })
  @ApiResponse({ status: 200, description: 'Search results' })
  async search(
    @Query('q') query: string,
    @Query('categoryId') categoryId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('ai') ai?: string,
  ) {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    const isAiSearch = ai === 'true';

    const results = await this.opensearchService.searchProducts(
      query,
      categoryId,
      min,
      max,
      isAiSearch,
    );
    return { data: results, total: results.length };
  }

  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI shopping assistant' })
  @ApiBody({ schema: { type: 'object', properties: { message: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'AI response text' })
  async chat(@Body('message') message: string) {
    if (!message) return { text: 'Please provide a message.' };
    const response = await this.opensearchService.chat(message);
    return { text: response };
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Get search query autocomplete suggestions' })
  @ApiQuery({ name: 'q', required: true, description: 'Partial search query' })
  @ApiResponse({ status: 200, description: 'List of suggestions' })
  async autocomplete(@Query('q') query: string) {
    if (!query || query.length < 2) return { data: [] };
    // For simplicity, using same search but we could use a specific suggester query
    const results = await this.opensearchService.searchProducts(query);
    return { data: results.slice(0, 5) };
  }
}
