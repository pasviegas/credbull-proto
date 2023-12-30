import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { EthersService } from './ethers.service';

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env.local'] })],
      providers: [EthersService],
    }).compile();

    service = await module.resolve<EthersService>(EthersService);
  });

  it('client should be defined', () => {
    expect(service.client).toBeDefined();
  });
});
