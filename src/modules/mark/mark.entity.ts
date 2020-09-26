import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Mark {
  @ObjectIdColumn()
  id: number;

  // 店名
  @Column()
  shopName: string;

  //类型
  @Column()
  category: string;

  // 人均花销
  @Column()
  cost: number;

  // 备注
  @Column()
  remark: string;

  // 经度
  @Column()
  longitude: string;

  // 纬度
  @Column()
  latitude: string;
  
}
