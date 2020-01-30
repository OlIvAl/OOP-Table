import { HttpMethod } from '../enums';
import RequestParams from '../RequestParams';
import { IRequestParams } from '../interfaces';

describe('RequestParams', () => {
  const DEFAULT_PARAMS: RequestInit = {
    method: HttpMethod.GET,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  it('requestParams without body, when method = GET', () => {
    const requestParamsObj: IRequestParams = new RequestParams();

    expect(requestParamsObj.requestParams).toEqual(DEFAULT_PARAMS);
  });
  it('requestParams with body = null, when method = POST and params are default', () => {
    const requestParamsObj: IRequestParams = new RequestParams(null, HttpMethod.POST);

    DEFAULT_PARAMS.body = null;
    DEFAULT_PARAMS.method = HttpMethod.POST;

    expect(requestParamsObj.requestParams).toEqual(DEFAULT_PARAMS);
  });
  it('requestParams with body = forward body (simple object), when method = POST', () => {
    const body: object = {
      param1: 'qwe',
      param2: 2
    };

    const requestParamsObj: IRequestParams = new RequestParams(body, HttpMethod.POST);

    DEFAULT_PARAMS.body = JSON.stringify(body);
    DEFAULT_PARAMS.method = HttpMethod.POST;

    expect(requestParamsObj.requestParams).toEqual(DEFAULT_PARAMS);
  });
  it('requestParams with body = objectify forward body (object with objects), when method = POST', () => {
    const body: object = {
      objParam: {
        param1: 'qwe',
        param2: 2
      }
    };

    const requestParamsObj: IRequestParams = new RequestParams(body, HttpMethod.POST);

    DEFAULT_PARAMS.body = JSON.stringify(body);
    DEFAULT_PARAMS.method = HttpMethod.POST;

    expect(requestParamsObj.requestParams).toEqual(DEFAULT_PARAMS);
  });
});
