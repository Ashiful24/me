import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillDetailsService } from './skill-details.service';
import { CreateSkillDetailDto } from './dto/create-skill-detail.dto';
import { UpdateSkillDetailDto } from './dto/update-skill-detail.dto';

@ApiTags('skill-details')
@Controller('skill-details')
export class SkillDetailsController {
  constructor(private readonly service: SkillDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Create skill detail' })
  create(@Body() dto: CreateSkillDetailDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List skill details' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill detail by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update skill detail' })
  update(@Param('id') id: string, @Body() dto: UpdateSkillDetailDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete skill detail' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
