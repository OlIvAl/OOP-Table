import { HttpMethod } from './enums';
import RequestCommon from './RequestCommon';
import { IRequestParams } from './interfaces';

export default class RequestParams extends RequestCommon implements IRequestParams {
  get requestParams(): RequestInit {
    const params: RequestInit = {
      method: this.method,
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (this.method === HttpMethod.POST || this.method === HttpMethod.PUT) {
      return {
        ...params,
        body: this.body && JSON.stringify(this.body)
      };
    }

    return params;
  }
}
