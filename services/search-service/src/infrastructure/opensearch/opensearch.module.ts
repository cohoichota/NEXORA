import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';
import { OpensearchService } from './opensearch.service';

@Global()
@Module({
  providers: [
    {
      provide: 'OPENSEARCH_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Client({
          node: config.get<string>('OPENSEARCH_NODE') || 'http://opensearch:9200',
          auth: {
            username: config.get<string>('OPENSEARCH_USERNAME') || 'admin',
            password: config.get<string>('OPENSEARCH_PASSWORD') || 'admin',
          },
          ssl: {
            rejectUnauthorized: false,
          }
        });
      },
    },
    OpensearchService,
  ],
  exports: ['OPENSEARCH_CLIENT', OpensearchService],
})
export class OpensearchModule {}
