import { DataitemRepository } from '../interfaces/dataitemRepository';
import { Dataitem } from '../types/dataitem.types';

export class GetDatasetItemsUsecase {
  constructor(private readonly dataitemRepository: DataitemRepository) {}

  async call(datasetId: string): Promise<Dataitem[]> {
    return await this.dataitemRepository.getByDatasetId(datasetId);
  }
}
