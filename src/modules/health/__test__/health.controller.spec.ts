import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '../health.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('HealthController.check', () => {
    it('should a good state of health', async () => {
      const check = await controller.check();

      expect(check).toHaveProperty('app');
    });
  });
});
