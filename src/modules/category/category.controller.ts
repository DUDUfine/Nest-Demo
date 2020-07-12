import { Controller, UseGuards, Get, Put, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController { 
    constructor(private readonly categoryService: CategoryService) {}
    
    @Get('list')
    getCategories(@Query() querys): Promise<Category[]> {
        return this.categoryService.getList(querys);
    }

    @Post('add')
    addCategory(@Body() category):Promise<string> {
        var a = JSON.stringify(category) ;
        console.log('addCategory参数:'+a);
        return this.categoryService.create(category);
    }

    @Delete('delete')
    deleteCategory(@Body() category):Promise<string> {
        return this.categoryService.delete(category);
    }
}   