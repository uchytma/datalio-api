import { Controller, Get, HttpException, Inject, Param } from '@nestjs/common';
import { Dataset } from 'src/domain/datasets/types/dataset.types';
import { GetDatasetsUsecase } from 'src/domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/datasets/usecases/getById.usecase';

@Controller('datasets')
export class DatasetsController {
  constructor(
    private readonly getDatasetsUsecase: GetDatasetsUsecase,
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
  ) {}

  @Get()
  async get(): Promise<Dataset[]> {
    return await this.getDatasetsUsecase.get();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Dataset> {
    const set = await this.getDatasetByIdUsecase.get(id);
    if (set == null) throw new HttpException('Dataset not found', 404);
    return set;
  }
}
