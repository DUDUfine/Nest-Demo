/**
 * Infomation service.
 *
 * 
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Infomation } from './infomation.entity';

@Injectable()
export class InfomationService {
  constructor(
    @InjectRepository(Infomation)
    private infomationRepository: Repository<Infomation>,
  ) { }

  getList(querys): Promise<[Infomation[], number]>{
    let pageSize =  Number(querys.pageSize);
    let pageIndex = +querys.pageIndex;  // pageIndex从0开始
    let userId = querys.userId;
    console.log('querys:'+JSON.stringify(querys));
    
  // let findManyOptions = FindManyOptions<Infomation>()
    return this.infomationRepository.findAndCount({where: {userId: userId},skip: pageSize * pageIndex, take: pageSize });
  }

  queryById(id): Promise<Infomation> {
    return this.infomationRepository.findOne(id).then(res=> {
      console.log("queryById：" + JSON.stringify(res));
      return res;
    })
    .catch(err => {
      console.log("错误：" + JSON.stringify(err.stack));
      return null;
    });
  }

  

  async create(newInfomation: Infomation): Promise<string> {
    return this.infomationRepository.save(newInfomation).then(res => {
      return '创建成功';
    }).catch(err => {
      console.log("错误：" + JSON.stringify(err.stack));
      return '创建失败';
    });
  }

  async delete(params): Promise<string> {
    return this.infomationRepository.delete(params).then((res) => {
      return '删除成功';
    }).catch(err => {
      return '删除失败';
    })
  } 
}