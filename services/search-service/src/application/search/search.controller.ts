import { Controller, Get, Query } from '@nestjs/common';
import { OpensearchService } from '../../infrastructure/opensearch/opensearch.service';

@Controller('search')
export class SearchController {
  constructor(private readonly opensearchService: OpensearchService) {}

  @Get()
  async search(
    @Query('q') query: string,
    @Query('categoryId') categoryId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    
    const results = await this.opensearchService.searchProducts(query, categoryId, min, max);
    return { data: results, total: results.length };
  }

  @Get('autocomplete')
  async autocomplete(@Query('q') query: string) {
    if (!query || query.length < 2) return { data: [] };
    // For simplicity, using same search but we could use a specific suggester query
    const results = await this.opensearchService.searchProducts(query);
    return { data: results.slice(0, 5) };
  }
}
