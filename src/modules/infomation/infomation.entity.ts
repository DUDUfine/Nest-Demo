import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Infomation{
  @ObjectIdColumn()
  id: number;

  // 经度
  @Column()
  longitude: number; 
  
  //纬度
  @Column()
  latitude: number;

  //店名
  @Column()
  shopName: string;

  //美食类型
  @Column()
  type: string;

  //价格
  @Column()
  price: string;

  //备注
  @Column()
  remark: string;

  //用户ID
  @Column()
  userId: string;

  //创建时间
  @Column()
  createTime: string;

  //修改时间
  @Column()
  updateTime: string;
}