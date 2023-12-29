import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [SupabaseService],
    }).compile();

    service = await module.resolve<SupabaseService>(SupabaseService);
  });

  it('client should be defined', () => {
    expect(service.client).toBeDefined();
  });
});
