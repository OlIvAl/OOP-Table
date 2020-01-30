export type BodyDataType = any;

export interface IRequestCommon {}

export interface IRequestUrl extends IRequestCommon {
  requestUrl: string;
}

export interface IRequestParams extends IRequestCommon {
  requestParams: RequestInit;
}
