import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  categorName: string;

} 