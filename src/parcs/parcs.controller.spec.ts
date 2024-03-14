import { Test, TestingModule } from '@nestjs/testing';
import { ParcsController } from './parcs.controller';
import { ParcsService } from './parcs.service';

describe('ParcsController', () => {
  let controller: ParcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcsController],
      providers: [ParcsService],
    }).compile();

    controller = module.get<ParcsController>(ParcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
