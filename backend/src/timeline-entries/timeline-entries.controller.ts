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
import { TimelineEntriesService } from './timeline-entries.service';
import { CreateTimelineEntryDto } from './dto/create-timeline-entry.dto';
import { UpdateTimelineEntryDto } from './dto/update-timeline-entry.dto';

@ApiTags('timeline-entries')
@ApiBearerAuth()
@Controller('timeline-entries')
export class TimelineEntriesController {
  constructor(private readonly service: TimelineEntriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create timeline entry' })
  create(@Body() dto: CreateTimelineEntryDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List timeline entries' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get timeline entry by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update timeline entry' })
  update(@Param('id') id: string, @Body() dto: UpdateTimelineEntryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete timeline entry' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
