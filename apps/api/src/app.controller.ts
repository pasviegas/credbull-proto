import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
@ApiTags('Version')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Returns the api version' })
  @ApiResponse({ status: 200, description: 'Success', type: String })
  version(): string {
    return '0.0.1';
  }
}
