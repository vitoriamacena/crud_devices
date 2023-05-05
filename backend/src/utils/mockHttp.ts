import { createRequest, createResponse, MockRequest, MockResponse, RequestMethod  } from 'node-mocks-http';

interface MockHttpOptions {
  method?: RequestMethod;
  url?: string;
  params?: Record<string, any>;
  body?: Record<string, any>;
  query?: Record<string, any>;
}

function mockHttp({ method, url, params, body, query }: MockHttpOptions): { req: MockRequest<any>; res: MockResponse<any> } {
  const req = createRequest({
    method: method || 'GET',
    url: url || '/',
    params: params || {},
    body: body || {},
    query: query || {},
  });

  const res = createResponse();

  return { req, res };
}

export default mockHttp;
