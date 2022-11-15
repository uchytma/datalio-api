import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { DataitemSearchService } from 'src/domain/interfaces/dataitemSearchService';
import { DataItemIndexed, DataItemSearchResult } from 'src/domain/types/dataitemSearchService.types';
import { Dataitem, PostSearchResult } from './elastic.types';

@Injectable()
export class ElasticDataitemSearchService implements DataitemSearchService {
  private static ELASTIC_INDEX_NAME = 'dataitems';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async indexDataitem(dataItemIndexed: DataItemIndexed): Promise<void> {
    const dataitem = {
      id: dataItemIndexed.id,
      text: dataItemIndexed.text,
      datasetId: dataItemIndexed.datasetId,
    };
    await this.elasticsearchService.index({
      index: ElasticDataitemSearchService.ELASTIC_INDEX_NAME,
      body: dataitem,
    });
  }
  async search(text: string): Promise<DataItemSearchResult[]> {
    const res = await this.elasticsearchService.search<Dataitem>({
      index: ElasticDataitemSearchService.ELASTIC_INDEX_NAME,
      body: {
        query: {
          match: {
            text: text,
          },
        },
      },
    });

    return res.hits.hits.map((hit) => {
      const id: string = hit?._source?.id ?? 'unknown';
      const score: number = hit?._score ?? 0;
      return { id: id, score: score };
    });
  }
}
