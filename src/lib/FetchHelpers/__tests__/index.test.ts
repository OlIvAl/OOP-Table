import FetchHelpers from '../index';
import { HttpMethod } from '../enums';

jest.unmock('../index');

const TEST_URL: string = 'http://www.test.com/api';
const PARAMS: RequestInit = {
  method: HttpMethod.GET,
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};
const GET_PARAMS: RequestInit = {
  ...PARAMS,
  method: HttpMethod.GET
};
const POST_PARAMS: RequestInit = {
  ...PARAMS,
  method: HttpMethod.POST,
  body: null
};

const TEST_BODY = {
  param: 'value'
};

const EXPECTED_PARAMS = {
  ...POST_PARAMS,
  body: JSON.stringify(TEST_BODY)
};

const mockSuccessJson = { result: 'success' };
let mockSuccessResponse: Response;
let mockSuccessFetchPromise: Promise<Response>;

const mockFailureJson = { result: 'failure' };
let mockFailureResponse: Response;
let mockFailureFetchPromise: Promise<Response>;

beforeEach(() => {
  mockSuccessResponse = new Response(JSON.stringify(mockSuccessJson), {
    status: 200
  });
  mockSuccessFetchPromise = Promise.resolve(mockSuccessResponse);

  mockFailureResponse = new Response(JSON.stringify(mockFailureJson), {
    status: 500
  });
  mockFailureFetchPromise = Promise.resolve(mockFailureResponse);
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ts ignore тут - так как тесты были написаны раньше. Покак нет времени переписывать
describe('FetchHelpers fetchJSON', () => {
  it('call with url, params and GET method', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockSuccessFetchPromise);

    //@ts-ignore
    const result = await FetchHelpers.fetchJSON(HttpMethod.GET, TEST_URL, TEST_BODY);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(`${TEST_URL}?param=value`, GET_PARAMS);
    expect(result).toEqual(mockSuccessJson);
  });
  it('call with url, params and POST method', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockSuccessFetchPromise);

    //@ts-ignore
    const result = await FetchHelpers.fetchJSON(HttpMethod.POST, TEST_URL, TEST_BODY);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(TEST_URL, EXPECTED_PARAMS);
    expect(result).toEqual(mockSuccessJson);
  });
  it('throw error', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFailureFetchPromise);

    try {
      //@ts-ignore
      await FetchHelpers.fetchJSON(HttpMethod.POST, TEST_URL, TEST_BODY);
    } catch (e) {
      expect(e).toBeInstanceOf(Response);
    }
  });

  it('getJSON', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockSuccessFetchPromise);

    const result = await FetchHelpers.getJSON(TEST_URL, TEST_BODY);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(`${TEST_URL}?param=value`, GET_PARAMS);
    expect(result).toEqual(mockSuccessJson);
  });

  it('postJSON', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockSuccessFetchPromise);

    const result = await FetchHelpers.postJSON(TEST_URL, TEST_BODY);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(TEST_URL, EXPECTED_PARAMS);
    expect(result).toEqual(mockSuccessJson);
  });

  it('putJSON', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockSuccessFetchPromise);

    const result = await FetchHelpers.putJSON(TEST_URL, TEST_BODY);

    EXPECTED_PARAMS.method = HttpMethod.PUT;

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(TEST_URL, EXPECTED_PARAMS);
    expect(result).toEqual(mockSuccessJson);
  });
});
