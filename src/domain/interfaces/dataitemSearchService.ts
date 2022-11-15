import { DataItemIndexed, DataItemSearchResult } from '../types/dataitemSearchService.types';

export interface DataitemSearchService {
  indexDataitem(dataItemIndexed: DataItemIndexed): Promise<void>;
  search(text: string): Promise<DataItemSearchResult[]>;
}
