import { Tables } from '@credbull/supabase';
import { Injectable } from '@nestjs/common';

import { SupabaseService } from '@/supabase/supabase.service';

@Injectable()
export class AppService {
  constructor(private readonly supabase: SupabaseService) {}

  hello(): string {
    return 'Hello World!';
  }

  async wallets(): Promise<Tables<'user_wallets'> | null> {
    const { data } = await this.supabase.client().from('user_wallets').select().single();
    return data;
  }
}
