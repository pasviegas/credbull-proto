import { Controller, Get, UnauthorizedException } from '@nestjs/common';

import { SupabaseService } from '@/clients/supabase/supabase.service';
import { KycService } from '@/modules/accounts/kyc.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly kyc: KycService,
    private readonly supabase: SupabaseService,
  ) {}

  @Get('status')
  async status() {
    const { data: auth } = await this.supabase.client().auth.getUser();

    if (!auth.user) throw UnauthorizedException;

    return this.kyc.status(auth.user);
  }
}
