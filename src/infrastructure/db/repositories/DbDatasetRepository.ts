import { Repository } from 'typeorm';
import { DatasetRepositoryReadonly } from 'src/domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { Dataset } from 'src/domain/datasets/types/dataset.types';
import { DatasetEntity } from '../entities/dataset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbDatasetRepository implements DatasetRepositoryReadonly {
  constructor(
    @InjectRepository(DatasetEntity)
    private readonly repo: Repository<DatasetEntity>,
  ) {}

  async getById(id: string): Promise<Dataset | null> {
    return await this.repo.findOneBy({ id: id });
  }
  async get(): Promise<Dataset[]> {
    return await this.repo.find();
  }
}
