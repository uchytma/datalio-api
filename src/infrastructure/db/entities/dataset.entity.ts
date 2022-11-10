import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dataset')
export class DatasetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;
}
