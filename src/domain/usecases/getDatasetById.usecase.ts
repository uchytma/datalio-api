import { DatasetRepository } from '../interfaces/datasetRepository.interface';
import { Dataset } from '../types/dataset.types';

export class GetDatasetByIdUsecase {
  constructor(private readonly datasetRepository: DatasetRepository) {}

  async call(guid: string): Promise<Dataset | null> {
    return await this.datasetRepository.getById(guid);
  }
}
