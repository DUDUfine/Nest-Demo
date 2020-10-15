/**
 * @file Http响应接口
 * @author DUDUfine
 * */

export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

export interface IHttpResultPaginate<T> {
  data: T;
  pagination: {
    total: T;
    // currentPage: number;
    // totalPage: number;
    // pageSize: number;
  };
}

export interface PaginateResult<T> {
  data: Array<T>;
}
// HTTP 状态返回
export interface IHttpResponseBase {
  status: EHttpStatus;
  message: string;
}

// HTTP success 返回
export type THttpSuccessResponse<T> = IHttpResponseBase & {
  result: T | IHttpResultPaginate<T>;
};
