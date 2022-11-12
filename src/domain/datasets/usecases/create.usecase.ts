import { DatasetRepository } from '../interfaces/datasetRepository.interface';
import type { Dataset } from '../types/dataset.types';

export class CreateDatasetUsecase {
  constructor(private readonly datasetRepository: DatasetRepository) {}

  async call(name: string, code: string): Promise<Dataset> {
    return await this.datasetRepository.create(name, code);
  }
}
