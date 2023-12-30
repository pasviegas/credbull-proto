import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  version(): string {
    return '0.0.1';
  }
}
