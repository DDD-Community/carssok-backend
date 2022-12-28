import { SimpleAuthGuard } from './simple-auth.guard';

describe('SimpleAuthGuard', () => {
  it('should be defined', () => {
    expect(new SimpleAuthGuard()).toBeDefined();
  });
});
