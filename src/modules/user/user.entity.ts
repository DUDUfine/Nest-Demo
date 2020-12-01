import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class User{
  @ObjectIdColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  token: string;

} 