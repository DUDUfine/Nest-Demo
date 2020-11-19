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

  @Column({
    comment: '店名',
    nullable: false,
    length: 30
  })
  shopName: string;

  @Column({
      comment: '类型',
      length: 30
    }
  )
  category: string;


  @Column( {
    comment: '人均花销',
  })
  cost: number;

  @Length(0, 100)
  @Column({
    comment: '备注',
  })
  remark: string;

  @Column({
    comment: '经度',
    nullable: false,
  })
  longitude: string;


  @Column({
    comment: '纬度',
    nullable: false
  })
  latitude: string;

  @Column({
    type: 'timestamp',
    comment: '创建时间',
    default: new Date(),
    nullable: false
  })
  @IsDate()
  createTime: Date;
 
  @Column({
    type: 'timestamp',
    comment: '更新时间',
    default: new Date(),
    nullable: false
  })
  @IsDate()
  updateTime: Date;

}
