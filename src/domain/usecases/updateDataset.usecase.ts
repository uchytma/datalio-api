import { DatasetRepository } from '../interfaces/datasetRepository.interface';
import type { Dataset, UpdateDataset } from '../types/dataset.types';

export class UpdateDatasetUsecase {
  constructor(private readonly datasetRepository: DatasetRepository) {}

  async call(model: UpdateDataset): Promise<Dataset> {
    return await this.datasetRepository.update(model);
  }
}
