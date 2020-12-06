import { Controller, Get, Post, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from './../../guards/auth.guard';
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

      // 检测 Token 有效性
    @Post('check')
    @UseGuards(AuthGuard)
    checkToken(@Query() querys): Promise<boolean> {
        return this.UserService.hasToken(querys)
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

    @Post('login')
    login(@Body() params):Promise<string> {
        return this.UserService.login(params);
    }

}   