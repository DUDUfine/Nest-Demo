import { Controller, UseGuards, Get, Put, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController { 
    constructor(private readonly UserService: UserService) {}
    
    @Get('list')
    getCategories(@Query() querys): Promise<[User[],number]> {
        return this.UserService.getList(querys);
    }

    @Post('add')
    addUser(@Body() User):Promise<string> {
        var a = JSON.stringify(User) ;
        console.log('addUser参数:'+a);
        return this.UserService.create(User);
    }

    @Delete('delete')
    deleteUser(@Body() User):Promise<string> {
        return this.UserService.delete(User);
    }

    @Get('queryById')
    queryById(@Query() querys):Promise<User> | string {
        let id = querys.id;
        console.log('iquerys:'+JSON.stringify(querys));  
        console.log('id:'+JSON.stringify(id));
        if (!id) {
           return 'id为空';
        }
        return this.UserService.queryById(id)
    }
}   