import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataSet {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;
}
