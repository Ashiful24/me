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
import { ProjectTagsService } from './project-tags.service';
import { CreateProjectTagDto } from './dto/create-project-tag.dto';
import { UpdateProjectTagDto } from './dto/update-project-tag.dto';

@ApiTags('project-tags')
@ApiBearerAuth()
@Controller('project-tags')
export class ProjectTagsController {
  constructor(private readonly service: ProjectTagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create project tag' })
  create(@Body() dto: CreateProjectTagDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List project tags' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project tag by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project tag' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectTagDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project tag' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
