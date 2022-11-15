import { DataitemRepository } from '../interfaces/dataitemRepository';
import { Dataitem } from '../types/dataitem.types';

export class GetDataitemsByIdUsecase {
  constructor(private readonly datasetRepository: DataitemRepository) {}

  async call(ids: string[]): Promise<Dataitem[]> {
    return await this.datasetRepository.getByIds(ids);
  }
}
