import { SimpleAuthMiddleware } from './simple-auth.middleware';

describe('SimpleAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new SimpleAuthMiddleware()).toBeDefined();
  });
});
