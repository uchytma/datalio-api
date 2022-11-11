import { Repository } from 'typeorm';
import { DatasetRepository } from 'src/domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import {
  Dataset,
  UpdateDataset,
} from 'src/domain/datasets/types/dataset.types';
import { DatasetEntity } from '../entities/dataset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DatasetCodeAlreadyExistsException } from 'src/domain/datasets/exceptions/datasetCodeAlreadyExists.exception';
import { TypeOrmPostgressErrorParser } from 'src/utils/typeOrm/typeOrmPostgressErrorParser';
import { DatasetNotFoundException } from 'src/domain/datasets/exceptions/datasetNotFoundException';

@Injectable()
export class DbDatasetRepository implements DatasetRepository {
  constructor(
    @InjectRepository(DatasetEntity)
    private readonly repo: Repository<DatasetEntity>,
  ) {}

  /**
   * @throws DatasetCodeAlreadyExistsException
   * @throws DatasetNotFoundException
   */
  async update(dataset: UpdateDataset): Promise<Dataset> {
    const datasetEntity = await this.getById(dataset.id);
    if (datasetEntity == null) throw new DatasetNotFoundException();
    try {
      return await this.repo.save({ ...datasetEntity, ...dataset });
    } catch (e) {
      if (TypeOrmPostgressErrorParser.isDuplicateFieldError(e, 'code'))
        throw new DatasetCodeAlreadyExistsException();
      throw e;
    }
  }

  /**
   * @throws DatasetCodeAlreadyExistsException
   */
  async create(name: string, code: string): Promise<Dataset> {
    const dbEntity = this.repo.create({ name: name, code: code });
    try {
      return await this.repo.save(dbEntity);
    } catch (e) {
      if (TypeOrmPostgressErrorParser.isDuplicateFieldError(e, 'code'))
        throw new DatasetCodeAlreadyExistsException();
      throw e;
    }
  }

  getById(id: string): Promise<Dataset | null> {
    return this.repo.findOneBy({ id: id });
  }

  get(): Promise<Dataset[]> {
    return this.repo.find();
  }
}
