import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('health')
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'API root status' })
  getHello() {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check (API + database)' })
  getHealth() {
    return this.appService.getHealth();
  }
}
