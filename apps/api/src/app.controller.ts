import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get()
  hello(): ReturnType<AppService['hello']> {
    return this.app.hello();
  }

  @Get('/wallets')
  async wallets(): ReturnType<AppService['wallets']> {
    return this.app.wallets();
  }
}
