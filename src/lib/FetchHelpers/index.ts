import { HttpMethod } from './enums';
import { BodyDataType, IRequestParams, IRequestUrl } from './interfaces';
import RequestUrl from './RequestUrl';
import RequestParams from './RequestParams';

export default class FetchHelpers {
  /**
   * Fetch request to server
   * @param method - request method
   * @param url - request url
   * @param body - request body
   * @returns - response
   */
  private static fetchJSON = async <T>(
    method: HttpMethod,
    url: string,
    body: BodyDataType = null
  ): Promise<T> => {
    const requestUrlObj: IRequestUrl = new RequestUrl(url, body, method);
    const requestParamsObj: IRequestParams = new RequestParams(body, method);

    try {
      const response: Response = await fetch(
        requestUrlObj.requestUrl,
        requestParamsObj.requestParams
      );
      if (!response.ok && response.status >= 400) {
        throw response;
      }
      return await response.json();
    } catch (e) {
      throw e;
    }
  };

  /**
   * Fetch request to server with GET method
   * @param {string} url - request url
   * @param {BodyDataType} body - request body
   * @returns - response
   */
  static getJSON = async <T>(url: string, body: BodyDataType = null): Promise<T> => {
    return FetchHelpers.fetchJSON(HttpMethod.GET, url, body);
  };

  /**
   * Fetch request to server with POST method
   * @param {string} url - request url
   * @param {BodyDataType} body - request body
   * @returns - response
   */
  static postJSON = async <T>(url: string, body: BodyDataType = null): Promise<T> => {
    return FetchHelpers.fetchJSON(HttpMethod.POST, url, body);
  };

  /**
   * Fetch request to server with PUT method
   * @param {string} url - request url
   * @param {BodyDataType} body - request body
   * @returns - response
   */
  static putJSON = async <T>(url: string, body: BodyDataType = null): Promise<T> => {
    return FetchHelpers.fetchJSON(HttpMethod.PUT, url, body);
  };
}
