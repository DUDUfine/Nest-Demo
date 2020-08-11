/**
 * Category service.
 *
 * 
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService { 
  constructor( 
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ){}

  getList(querys): Promise<Category[]> {
    return this.categoryRepository.find(querys);
  }


  async create(newCategory: Category): Promise<string> {

    let category = new Category();
    category.categorName = newCategory.categorName;
    // category.id = '22';
      // let category = this.categoryRepository.create(newCategory);
      //  await this.categoryRepository.save(category);  
      // let result = this.categoryRepository.save(category)  
      console.log("增加：");
      return this.categoryRepository.save(category).then(res => {
        return '创建成功';
      }).catch( err => {
        console.log("错误："+ JSON.stringify(err.stack));
        return '创建失败';
      });
  }

  async delete(params): Promise<string> {
    return 
  }
}