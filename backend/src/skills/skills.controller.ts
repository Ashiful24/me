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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skills')
@ApiBearerAuth()
@Controller('skills')
export class SkillsController {
  constructor(private readonly service: SkillsService) {}

  @Post()
  @ApiOperation({ summary: 'Create skill' })
  create(@Body() dto: CreateSkillDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List skills (filter by userId and group)' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({
    name: 'parentId',
    required: false,
    description: 'Skill group id',
  })
  @ApiQuery({
    name: 'groupId',
    required: false,
    description: 'Alias of parentId (skill group id)',
  })
  findAll(
    @Query('userId') userId?: string,
    @Query('parentId') parentId?: string,
    @Query('groupId') groupId?: string,
  ) {
    return this.service.findAll(userId, parentId || groupId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update skill' })
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete skill' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
