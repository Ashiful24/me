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
import { ProjectCredentialsService } from './project-credentials.service';
import { CreateProjectCredentialDto } from './dto/create-project-credential.dto';
import { UpdateProjectCredentialDto } from './dto/update-project-credential.dto';

@ApiTags('project-credentials')
@Controller('project-credentials')
export class ProjectCredentialsController {
  constructor(private readonly service: ProjectCredentialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create project credential' })
  create(@Body() dto: CreateProjectCredentialDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List project credentials' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project credential by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project credential' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectCredentialDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project credential' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
