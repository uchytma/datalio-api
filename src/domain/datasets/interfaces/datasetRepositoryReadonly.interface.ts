import { Dataset } from '../types/dataset.types';

export interface DatasetRepositoryReadonly {
  getById(id: string): Promise<Dataset | null>;
  get(): Promise<Dataset[]>;
}
