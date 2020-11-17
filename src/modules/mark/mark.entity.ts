import { IsDate, IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity()
export class Mark {
  @ObjectIdColumn()
  id: ObjectID;

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
  @Length(0, 100)
  remark: string;

  // 经度
  @Column()
  longitude: string;

  // 纬度
  @Column()
  latitude: string;

  @Column()
  @IsDate()
  createDate: Date;

  @Column()
  @IsDate()
  updateDate: Date;
  
}
