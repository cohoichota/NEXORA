import { Module } from '@nestjs/common';

import { RecommendationController } from './presentation/controllers/recommendation.controller';

@Module({
  imports: [],
  controllers: [RecommendationController],
  providers: [],
})
export class AppModule {}
