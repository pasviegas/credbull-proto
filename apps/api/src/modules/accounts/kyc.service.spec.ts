import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { KycService } from './kyc.service';

describe('KycService', () => {
  let service: KycService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KycService],
    }).compile();

    service = await module.resolve<KycService>(KycService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
