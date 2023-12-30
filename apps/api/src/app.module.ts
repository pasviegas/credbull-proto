import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { SupabaseGuard } from '@/clients/supabase/auth/supabase.guard';
import { SupabaseModule } from '@/clients/supabase/supabase.module';
import { AccountsModule } from '@/modules/accounts/accounts.module';
import { Config } from '@/utils/module';

import { AppController } from './app.controller';

@Module({
  imports: [
    Config.module(),
    SupabaseModule,
    // EthersModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class AppModule {}
