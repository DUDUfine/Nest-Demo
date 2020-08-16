/**
 * User service.
 *
 * 
 * 
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import redis from '../../util/redis';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) { }

  getList(querys): Promise<[User[], number]> {
    let pageSize = Number(querys.pageSize);
    let pageIndex = +querys.pageIndex;  // pageIndex从0开始
    let userId = querys.userId;
    console.log('querys:' + JSON.stringify(querys));
    let key = 'userId_' + pageIndex + '_' + pageSize + '_' + userId;

    let getRedisByKey = async function (key) {
      // get 获取
      let value = await redis.get(key, (err, value) => {
        if (err) {
          console.log(err);
        }
        if (!value) {
          // return value;
          return  new Promise((resolve,reject) => {
                console.log('redis-user: user'+JSON.stringify(value));
                resolve(value);
              });;
        }
      })
return value;


    };
    let user =  getRedisByKey(key);
    if (user) return user;
    return this.UserRepository.findAndCount({ where: { userId: userId }, skip: pageSize * pageIndex, take: pageSize }).then((res) => {
      redis.set(key, res);
      console.log('getList-user: user' + JSON.stringify(res));
      return res;
    });


    // console.log('redis-user-before: user'+JSON.stringify(user));
    // if (user) {
    //   return new Promise((resolve,reject) => {
    //     console.log('redis-user: user'+JSON.stringify(user));
    //     resolve(user);
    //   });
    // }

  }

  queryById(id): Promise<User> {
    return this.UserRepository.findOne(id).then(res => {
      console.log("queryById：" + JSON.stringify(res));
      return res;
    })
      .catch(err => {
        console.log("错误：" + JSON.stringify(err.stack));
        return null;
      });
  }



  async create(newUser: User): Promise<string> {
    return this.UserRepository.save(newUser).then(res => {
      return '创建成功';
    }).catch(err => {
      console.log("错误：" + JSON.stringify(err.stack));
      return '创建失败';
    });
  }

  async delete(params): Promise<string> {
    return this.UserRepository.delete(params).then((res) => {
      return '删除成功';
    }).catch(err => {
      return '删除失败';
    })
  }
}