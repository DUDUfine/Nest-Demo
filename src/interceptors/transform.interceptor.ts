import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Response } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
      const result = context.switchToHttp().getResponse();
      return { data, code: result.statusCode, message: '成功！'}
    }));
  }
}