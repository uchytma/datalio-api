import { DataitemSearchService } from '../interfaces/dataitemSearchService';
import { DataItemSearchResult } from '../types/dataitemSearchService.types';

export class FindDataitemsUsecase {
  constructor(private readonly dataitemSearchService: DataitemSearchService) {}

  async call(text: string): Promise<DataItemSearchResult[]> {
    return await this.dataitemSearchService.search(text);
  }
}
