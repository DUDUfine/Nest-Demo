import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Tag{
  @ObjectIdColumn()
  id: number;

  // 类型Code
  @Column()
  typeCode: number; 
  
  //类型名称
  @Column()
  typeName: number;

  //用户id
  @Column()
  userId: string;

} 