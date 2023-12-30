import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { EthersModule } from '@/clients/ethers/ethers.module';
import { SupabaseGuard } from '@/clients/supabase/auth/supabase.guard';
import { SupabaseModule } from '@/clients/supabase/supabase.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    SupabaseModule,
    EthersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    AppService,
  ],
})
export class AppModule {}
