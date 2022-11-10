import { DatasetRepositoryReadonly } from '../interfaces/datasetRepositoryReadonly.interface';
import { Dataset } from '../types/dataset.types';

export class GetDatasetByIdUsecase {
  constructor(private readonly datasetRepository: DatasetRepositoryReadonly) {}

  async get(guid: string): Promise<Dataset | null> {
    return await this.datasetRepository.getById(guid);
  }
}
