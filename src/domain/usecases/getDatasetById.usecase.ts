import { DatasetRepository } from '../interfaces/datasetRepository';
import { Dataset } from '../types/dataset.types';

export class GetDatasetByIdUsecase {
  constructor(private readonly datasetRepository: DatasetRepository) {}

  async call(id: string): Promise<Dataset | null> {
    return await this.datasetRepository.getById(id);
  }
}
