import { Dataset, UpdateDataset } from '../types/dataset.types';

export interface DatasetRepository {
  getById(id: string): Promise<Dataset | null>;
  get(): Promise<Dataset[]>;
  create(name: string, code: string): Promise<Dataset>;
  update(dataset: UpdateDataset): Promise<Dataset>;
}
