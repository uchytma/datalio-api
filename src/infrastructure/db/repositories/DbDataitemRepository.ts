import { In, Repository } from 'typeorm';
import { DatasetEntity } from '../entities/dataset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DatasetNotFoundException } from 'src/domain/exceptions/datasetNotFoundException';
import { DataitemRepository } from 'src/domain/interfaces/dataitemRepository';
import { DataitemEntity } from '../entities/dataitem.entity';
import { CreateDataitem, Dataitem } from 'src/domain/types/dataitem.types';

@Injectable()
export class DbDataitemRepository implements DataitemRepository {
  constructor(
    @InjectRepository(DataitemEntity)
    private readonly repo: Repository<DataitemEntity>,
    @InjectRepository(DatasetEntity)
    private readonly repoDataset: Repository<DatasetEntity>,
  ) {}
  async getByIds(ids: string[]): Promise<Dataitem[]> {
    const items = await this.repo.find({ where: { id: In(ids) }, relations: ['dataset'] });
    return items.map((item) => ({ ...item, datasetId: item.dataset.id }));
  }

  /**
   * @throws DatasetNotFoundException
   */
  async create(model: CreateDataitem): Promise<Dataitem> {
    const dataSet = await this.repoDataset.findOne({ where: { id: model.datasetId } });
    if (dataSet == null) throw new DatasetNotFoundException();
    const dbEntity = this.repo.create(model);
    dbEntity.dataset = dataSet;
    const savedEntity = await this.repo.save(dbEntity);
    return { ...savedEntity, datasetId: dataSet.id };
  }

  async getByDatasetIds(datasetIds: string[]): Promise<Map<string, Dataitem[]>> {
    const items = await this.repoDataset.find({ where: { id: In(datasetIds) }, relations: ['dataitems'] });
    return new Map(items.map((item) => [item.id, this.mapToDomain(item)]));
  }

  /**
   * @throws DatasetNotFoundException
   */
  async getByDatasetId(datasetId: string): Promise<Dataitem[]> {
    const dataSet = await this.repoDataset.findOne({ where: { id: datasetId }, relations: ['dataitems'] });
    if (dataSet == null) throw new DatasetNotFoundException();
    return this.mapToDomain(dataSet);
  }

  private mapToDomain(dataset: DatasetEntity): Dataitem[] {
    return dataset.dataitems.map((item) => ({
      ...item,
      datasetId: dataset.id,
    }));
  }
}
