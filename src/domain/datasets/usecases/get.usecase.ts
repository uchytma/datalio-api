import { DatasetRepositoryReadonly } from '../interfaces/datasetRepositoryReadonly.interface';
import type { Dataset } from '../types/dataset.types';

export class GetDatasetsUsecase {
  constructor(private readonly datasetRepository: DatasetRepositoryReadonly) {}

  async get(): Promise<Dataset[]> {
    return await this.datasetRepository.get();
  }
}
