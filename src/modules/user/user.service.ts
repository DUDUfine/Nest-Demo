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
import redis from '../../utils/redis';
import axios from 'axios';
import uuid from 'node-uuid';
import { response } from 'express';

const appid = 'xxx';
const secret = 'xxx';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async login(params): Promise<string>{
    console.log('code'+params.code)
    return axios.get('https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+params.code+'&grant_type=authorization_code').then((response: any)=> {
      console.log('登录请求响应');
      // console.log(response.data);
      
      if (response.errcode && response.errcode != 0) {  // response.errcode=0为成功
       return `登录失败,错误码${response.errcode }！`
      } else {
        let token = uuid.v1();
        let tempuser = new User();
        tempuser.token = token;
        tempuser.sessionKey = response.data.session_key;
        tempuser.openid = response.data.openid;
        this.create(tempuser);
        return token;
      }
     
    }).catch((error) => {
      console.log('异常'+error);
      return `登录失败,错误${error }！`
    })
  }

  hasToken(querys): Promise<boolean> {
    return this.userRepository.find({token: querys}).then(users => {
      if (users.length>0) {
        return true;
      }
      return false;
    })
  }

  async create(newUser: User): Promise<string> {
    return this.userRepository.save(newUser)
      .then((res) => {
        console.log('创建成功');
        return '创建成功';
      })
      .catch((err) => {
        console.log('错误：' + JSON.stringify(err.stack));
        return '创建失败';
      });
  }
  
  async getList(querys): Promise<[User[], number]> {
    let pageSize = Number(querys.pageSize);
    let pageIndex = +querys.pageIndex; // pageIndex从0开始
    let userId = querys.userId;
    console.log('querys:' + JSON.stringify(querys));
    let key = 'userId_' + pageIndex + '_' + pageSize + '_' + userId;

    return redis.getAsync(key).then(function (res) {
      if (res) {
        console.log('redis数据库查询' + JSON.stringify(res));
        return JSON.parse(res);
        // new Promise((resolve, reject) => {
        //   console.log('redis数据库查询' + JSON.stringify(res));
        //   resolve(JSON.parse(res));
        // });
      } else {
        return this.userRepository.findAndCount({
          where: { userId: userId },
          skip: pageSize * pageIndex,
          take: pageSize,
        }).then((res) => {
          console.log('数据库查询' + JSON.stringify(res));
          redis.client.set(key, JSON.stringify(res));
          return res;
        });
      }
      //console.log(res); // => 'bar'
    });

    // let user = { value: null };
    // await this.getRedisByKey(key, user);
    // console.log('user:' + JSON.stringify(user));

    // if (user.value) {
    //   return new Promise((resolve, reject) => {
    //     console.log('redis-user: user' + JSON.stringify(user));
    //     resolve(JSON.parse(user.value) );
    //   });
    // }
    // console.log("数据库查询");

    // return this.UserRepository.findAndCount({ where: { userId: userId }, skip: pageSize * pageIndex, take: pageSize }).then((res) => {
    //   console.log('getList-user: user' + JSON.stringify(res));
    //   redis.client.set(key, JSON.stringify(res));
    //   return res;
    // });
  }

  // async getRedisByKey(key, result) {
  //   // get 获取
  //   await redis.getAsync(key, (err, value) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log('redis-user: value' + JSON.stringify(value));
  //     if (value) {
  //       result.value = value;
  //     }
  //   })
  // };

  queryById(id): Promise<User> {
    return this.userRepository.findOne(id)
      .then((res) => {
        console.log('queryById：' + JSON.stringify(res));
        return res;
      })
      .catch((err) => {
        console.log('错误：' + JSON.stringify(err.stack));
        return null;
      });
  }

  

  async delete(params): Promise<string> {
    return this.userRepository.delete(params)
      .then((res) => {
        return '删除成功';
      })
      .catch((err) => {
        return '删除失败';
      });
  }
}
