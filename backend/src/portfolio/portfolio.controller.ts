import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { PortfolioService } from './portfolio.service';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Public portfolio payload (read-only, no auth)',
  })
  getPublic(@Query('username') username?: string) {
    return this.service.getPublicPortfolio(username);
  }
}
