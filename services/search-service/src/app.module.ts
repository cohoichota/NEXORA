import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpensearchModule } from './infrastructure/opensearch/opensearch.module';
import { IndexerModule } from './application/indexer/indexer.module';
import { SearchModule } from './application/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    OpensearchModule,
    IndexerModule,
    SearchModule,
  ],
})
export class AppModule {}
