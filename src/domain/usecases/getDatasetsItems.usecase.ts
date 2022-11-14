import { DataitemRepository } from '../interfaces/dataitemRepository';
import { Dataitem } from '../types/dataitem.types';

export class GetDatasetsItemsUsecase {
  constructor(private readonly dataitemRepository: DataitemRepository) {}

  async call(datasetIds: Set<string>): Promise<Map<string, Dataitem[]>> {
    return await this.dataitemRepository.getByDatasetIds(Array.from(datasetIds));
  }
}
