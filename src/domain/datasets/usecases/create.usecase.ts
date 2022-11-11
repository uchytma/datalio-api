import { DatasetRepository } from '../interfaces/datasetRepositoryReadonly.interface';
import type { Dataset } from '../types/dataset.types';

export class CreateDatasetUsecase {
  constructor(private readonly datasetRepository: DatasetRepository) {}

  async call(name: string, code: string): Promise<Dataset> {
    return await this.datasetRepository.create(name, code);
  }
}
