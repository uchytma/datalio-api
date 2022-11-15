import { ClientOptions } from '@elastic/elasticsearch';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import * as fs from 'fs';
import { ElasticDataitemSearchService } from './elasticDataitemSearch.service';

@Module({})
export class ElasticModule {
  private static elasticClientOptions(configService: ConfigService): ClientOptions {
    const node = configService.get<string>('ELASTICSEARCH_NODE');
    const caPath = configService.get<string>('ELASTICSEARCH_CA_PATH') || '';
    const apiKey = configService.get<string>('ELASTICSEARCH_API_KEY') || '';

    return {
      node: node,
      tls: { rejectUnauthorized: false, ca: fs.readFileSync(caPath) },
      auth: {
        apiKey: apiKey,
      },
    };
  }

  static readonly ELASTIC_DATAITEM_SEARCH_SERVICE = 'ElasticDataitemSearchService';

  static register(): DynamicModule {
    return {
      module: ElasticModule,
      imports: [
        ElasticsearchModule.registerAsync({
          imports: [],
          inject: [ConfigService],
          useFactory: this.elasticClientOptions,
        }),
      ],
      providers: [
        {
          provide: ElasticModule.ELASTIC_DATAITEM_SEARCH_SERVICE,
          useClass: ElasticDataitemSearchService,
        },
      ],
      exports: [ElasticsearchModule, ElasticModule.ELASTIC_DATAITEM_SEARCH_SERVICE],
      controllers: [],
    };
  }
}
