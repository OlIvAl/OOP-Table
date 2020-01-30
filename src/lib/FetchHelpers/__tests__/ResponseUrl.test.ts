import RequestUrl from '../RequestUrl';
import { IRequestUrl } from '../interfaces';

describe('RequestUrl', () => {
  const TEST_URL: string = 'http://www.test.com/api';

  it('requestUrl = url, when params are default', () => {
    const responseUrlObj: IRequestUrl = new RequestUrl(TEST_URL);

    expect(responseUrlObj.requestUrl).toEqual(TEST_URL);
  });

  describe('generate right url from ', () => {
    it('basic body', () => {
      const BASIC_BODY: object = {
        param1: 'qwe',
        param2: 2
      };

      const EXPECTED_URL: string = `${TEST_URL}?param1=qwe&param2=2`;

      const responseUrlObj: IRequestUrl = new RequestUrl(TEST_URL, BASIC_BODY);

      expect(responseUrlObj.requestUrl).toEqual(EXPECTED_URL);
    });

    it('body with object', () => {
      const OBJ_BODY: object = {
        objParam: {
          param1: 'qwe',
          param2: 2
        }
      };

      const EXPECTED_URL: string = `${TEST_URL}?objParam%5Bparam1%5D=qwe&objParam%5Bparam2%5D=2`;

      const responseUrlObj: IRequestUrl = new RequestUrl(TEST_URL, OBJ_BODY);

      expect(responseUrlObj.requestUrl).toEqual(EXPECTED_URL);
    });
  });
});
