import { Controller, UseGuards, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { Category, DelCategories } from './category.model';

@Controller('category')
export class CategoryController { 
    constructor(private readonly categoryService: CategoryService) {}
}