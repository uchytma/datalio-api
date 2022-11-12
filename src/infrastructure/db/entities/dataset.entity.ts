import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DataitemEntity } from './dataitem.entity';

@Entity('dataset')
export class DatasetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => DataitemEntity, (dataitem) => dataitem.dataset)
  dataitems: DataitemEntity[];
}
