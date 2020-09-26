/**
 * Tag service.
 *
 * 
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './mark.entity';

@Injectable()
export class MarkService { 
  constructor( 
    @InjectRepository(Mark)
    private MarkRepository: Repository<Mark>,
  ){}

  async create(newMark: Mark): Promise<string> {
    return this.MarkRepository.save(newMark).then(res => {
      return '创建成功';
    }).catch(err => {
      console.log("错误：" + JSON.stringify(err.stack));
      return '创建失败';
    });
  }


  // 分页查询
  // getList(querys): Promise<[Mark[], number]>{
  //   let pageSize =  Number(querys.pageSize);
  //   let pageIndex = +querys.pageIndex;  // pageIndex从0开始
  //   let userId = querys.userId;
  //   console.log('querys:'+JSON.stringify(querys));
    
  // // let findManyOptions = FindManyOptions<Tag>()
  //   return this.MarkRepository.findAndCount({where: {userId: userId},skip: pageSize * pageIndex, take: pageSize });
  // }

  // queryById(id): Promise<Mark> {
  //   return this.MarkRepository.findOne(id).then(res=> {
  //     console.log("queryById：" + JSON.stringify(res));
  //     return res;
  //   })
  //   .catch(err => {
  //     console.log("错误：" + JSON.stringify(err.stack));
  //     return null;
  //   });
  // }

  


  // async delete(params): Promise<string> {
  //   return this.TagRepository.delete(params).then((res) => {
  //     return '删除成功';
  //   }).catch(err => {
  //     return '删除失败';
  //   })
  // } 
}