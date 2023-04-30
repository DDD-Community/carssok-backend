import { ResponseInterceptor } from './response.interceptor';

describe('CommonInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor()).toBeDefined();
  });
});
