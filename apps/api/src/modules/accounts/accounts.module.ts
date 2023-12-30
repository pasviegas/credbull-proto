import { Module } from '@nestjs/common';

import { SupabaseModule } from '@/clients/supabase/supabase.module';
import { AccountsController } from '@/modules/accounts/accounts.controller';
import { KycService } from '@/modules/accounts/kyc.service';

@Module({
  imports: [SupabaseModule],
  providers: [KycService],
  controllers: [AccountsController],
  exports: [KycService],
})
export class AccountsModule {}
