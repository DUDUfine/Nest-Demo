/**
 * Tag service.
 *
 * 
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService { 
  constructor( 
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ){}

  // 分页查询
  getList(querys): Promise<[Tag[], number]>{
    let pageSize =  Number(querys.pageSize);
    let pageIndex = +querys.pageIndex;  // pageIndex从0开始
    let userId = querys.userId;
    console.log('querys:'+JSON.stringify(querys));
    
  // let findManyOptions = FindManyOptions<Tag>()
    return this.tagRepository.findAndCount({where: {userId: userId},skip: pageSize * pageIndex, take: pageSize });
  }

  queryById(id): Promise<Tag> {
    return this.tagRepository.findOne(id).then(res=> {
      console.log("queryById：" + JSON.stringify(res));
      return res;
    })
    .catch(err => {
      console.log("错误：" + JSON.stringify(err.stack));
      return null;
    });
  }

  

  async create(newTag: Tag): Promise<string> {
    return this.tagRepository.save(newTag).then(res => {
      return '创建成功';
    }).catch(err => {
      console.log("错误：" + JSON.stringify(err.stack));
      return '创建失败';
    });
  }

  async delete(params): Promise<string> {
    return this.tagRepository.delete(params).then((res) => {
      return '删除成功';
    }).catch(err => {
      return '删除失败';
    })
  } 
}