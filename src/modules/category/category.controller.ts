import { Controller, UseGuards, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { Category, DelCategories } from './category.model';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController { 
    constructor(private readonly categoryService: CategoryService) {}
    
    @Get()
    getCategories(querys, options): Promise<Category> {
        return this.categoryService.getList(querys, options);
    }

    @Post()
    createCategory():Promise<Category> {
        return this.categoryService.create(category);
    }
}   