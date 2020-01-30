import { HttpMethod } from './enums';
import { IRequestCommon } from './interfaces';

export default abstract class RequestCommon implements IRequestCommon {
  protected body: object | null = null;
  protected method: HttpMethod = HttpMethod.GET;
  protected locale: boolean = true;

  constructor(
    body: object | null = null,
    method: HttpMethod = HttpMethod.GET,
    locale: boolean = false
  ) {
    this.body = body;
    this.method = method;
    this.locale = locale;
  }
}
