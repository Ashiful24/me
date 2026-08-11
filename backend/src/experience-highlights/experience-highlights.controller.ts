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
import { ExperienceHighlightsService } from './experience-highlights.service';
import { CreateExperienceHighlightDto } from './dto/create-experience-highlight.dto';
import { UpdateExperienceHighlightDto } from './dto/update-experience-highlight.dto';

@ApiTags('experience-highlights')
@Controller('experience-highlights')
export class ExperienceHighlightsController {
  constructor(private readonly service: ExperienceHighlightsService) {}

  @Post()
  @ApiOperation({ summary: 'Create experience highlight' })
  create(@Body() dto: CreateExperienceHighlightDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List experience highlights' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get experience highlight by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update experience highlight' })
  update(@Param('id') id: string, @Body() dto: UpdateExperienceHighlightDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete experience highlight' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
