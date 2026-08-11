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
import { ContactLinksService } from './contact-links.service';
import { CreateContactLinkDto } from './dto/create-contact-link.dto';
import { UpdateContactLinkDto } from './dto/update-contact-link.dto';

@ApiTags('contact-links')
@Controller('contact-links')
export class ContactLinksController {
  constructor(private readonly service: ContactLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create contact link' })
  create(@Body() dto: CreateContactLinkDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List contact links' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact link by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact link' })
  update(@Param('id') id: string, @Body() dto: UpdateContactLinkDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact link' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
