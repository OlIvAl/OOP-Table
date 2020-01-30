import { HttpMethod } from './enums';
import { IRequestUrl } from './interfaces';
import RequestCommon from './RequestCommon';
import qs from 'qs';

export default class RequestUrl extends RequestCommon implements IRequestUrl {
  protected url: string;

  get requestUrl(): string {
    if (this.method === HttpMethod.GET && this.body && Object.keys(this.body)) {
      const stringifyGetParams: string = this.body
        ? qs.stringify(this.body, { skipNulls: true })
        : '';

      return `${this.url}?${stringifyGetParams}`;
    }

    return this.url;
  }

  constructor(
    url: string,
    body: object | null = null,
    method: HttpMethod = HttpMethod.GET,
    locale: boolean = false
  ) {
    super(body, method, locale);

    this.url = url;
  }
}
