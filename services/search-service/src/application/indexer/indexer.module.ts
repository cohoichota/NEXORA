import { Module } from '@nestjs/common';

import { IndexerController } from './indexer.controller';

@Module({
  controllers: [IndexerController],
})
export class IndexerModule {}
