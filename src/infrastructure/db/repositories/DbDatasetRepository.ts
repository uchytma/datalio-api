import { Repository } from 'typeorm';
import { DatasetRepository } from 'src/domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { Dataset } from 'src/domain/datasets/types/dataset.types';
import { DatasetEntity } from '../entities/dataset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbDatasetRepository implements DatasetRepository {
  constructor(
    @InjectRepository(DatasetEntity)
    private readonly repo: Repository<DatasetEntity>,
  ) {}

  create(name: string, code: string): Promise<Dataset> {
    const dbEntity = this.repo.create({ name: name, code: code });
    return this.repo.save(dbEntity);
  }

  getById(id: string): Promise<Dataset | null> {
    return this.repo.findOneBy({ id: id });
  }

  get(): Promise<Dataset[]> {
    return this.repo.find();
  }
}
