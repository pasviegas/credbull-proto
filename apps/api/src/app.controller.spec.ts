import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = await app.resolve<AppController>(AppController);
  });

  it('should return "Hello World!"', () => {
    expect(controller.hello()).toBe('Hello World!');
  });
});
