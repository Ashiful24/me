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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillGroupsService } from './skill-groups.service';
import { CreateSkillGroupDto } from './dto/create-skill-group.dto';
import { UpdateSkillGroupDto } from './dto/update-skill-group.dto';

@ApiTags('skill-groups')
@ApiBearerAuth()
@Controller('skill-groups')
export class SkillGroupsController {
  constructor(private readonly service: SkillGroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create skill group' })
  create(@Body() dto: CreateSkillGroupDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List skill groups' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill group by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update skill group' })
  update(@Param('id') id: string, @Body() dto: UpdateSkillGroupDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete skill group' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
