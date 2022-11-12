import { DatasetRepository } from '../interfaces/datasetRepository.interface';
import type { Dataset } from '../types/dataset.types';

export class GetDatasetsUsecase {
  constructor(private readonly datasetRepository: DatasetRepository) {}

  async call(): Promise<Dataset[]> {
    return await this.datasetRepository.get();
  }
}
