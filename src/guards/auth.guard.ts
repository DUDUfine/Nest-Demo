/**
 * @file 鉴权守卫
 * @author DUDUfine
 */

// 警卫可以访问 ExecutionContext 实例，因此确切地知道接下来要执行什么,中间件不知道调用 next() 函数后会执行哪个处理程序
// 在传统的 Express 应用程序中，通常由中间件处理授权。中间件是身份验证的良好选择。到目前为止，访问限制逻辑大多在中间件内。这样很好，因为诸如 token 验证或将 request 对象附加属性与特定路由没有强关联。
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest().headers['token'];
    console.log('token值:'+token);
    
    const request = context.switchToHttp().getRequest();
    const { cookie } = context.switchToHttp().getRequest();
    return this.validateRequest(token);
  }
  validateRequest(token) {
   if (!token) {
     return false;
   }
    // console.log('路由守卫header-cookies' + JSON.stringify(cookie));

    // TODO Request中参数/请求头是否有用户信息

    // 处理逻辑
    return true;
  }
}
