import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './db.config';

const dbModule = TypeOrmModule.forRoot(getDataSourceOptions());

@Module({
  imports: [dbModule],
  controllers: [],
  providers: [],
})
export class DbModule {}
