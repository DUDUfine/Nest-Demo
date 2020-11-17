import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity()
export class Tag {
  @ObjectIdColumn()
  id: ObjectID;

  // 类型Code
  @Column()
  @IsNotEmpty()
  typeCode: number;

  //类型名称
  @Column()
  typeName: number;

  //用户id
  @Column()
  userId: string;
}
