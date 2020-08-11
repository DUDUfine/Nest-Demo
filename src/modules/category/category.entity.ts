import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Category{
  @ObjectIdColumn()
  id: number;

  @Column()
  categorName: string;

} 