import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DatasetEntity } from './dataset.entity';

@Entity('dataitem')
export class DataitemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => DatasetEntity, (dataset) => dataset.dataitems)
  dataset: DatasetEntity;
}
