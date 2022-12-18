import { Test, TestingModule } from '@nestjs/testing';
import { SimpleAuthController } from './simple-auth.controller';

describe('SimpleAuthController', () => {
  let controller: SimpleAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimpleAuthController],
    }).compile();

    controller = module.get<SimpleAuthController>(SimpleAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
