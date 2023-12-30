import { BadRequestException, Controller, Get } from '@nestjs/common';

import { SupabaseService } from '@/clients/supabase/supabase.service';
import { AccountStatusDto } from '@/modules/accounts/account-status.dto';
import { KycService } from '@/modules/accounts/kyc.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly kyc: KycService,
    private readonly supabase: SupabaseService,
  ) {}

  @Get('status')
  async status(): Promise<AccountStatusDto> {
    const { data } = await this.supabase.client().from('user_wallets').select().single();
    if (!data?.address) throw new BadRequestException();

    const status = await this.kyc.status(data.address);
    return new AccountStatusDto({ status });
  }
}
