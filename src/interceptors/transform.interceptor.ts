import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Response,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  EHttpStatus,
  IHttpResultPaginate,
  THttpSuccessResponse,
} from '../interfaces/http.interface';

export interface Response<T> {
  result: T;
}

export function transformDataToPaninate<T>(
  data: Array<T>,
): IHttpResultPaginate<T> {
  return {
    data: data[0],
    pagination: {
      total: data[1],
    },
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpSuccessResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<THttpSuccessResponse<T>> {
    return next.handle().pipe(
      map((data: any) => {
        console.log('数据格式化');

        let result =
          data instanceof Array ? transformDataToPaninate<T>(data) : data;
        return { result, status: EHttpStatus.Success, message: '成功！' };
      }),
    );
  }
}
