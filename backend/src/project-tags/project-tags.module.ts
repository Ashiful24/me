import { Module } from '@nestjs/common';
import { ProjectTagsController } from './project-tags.controller';
import { ProjectTagsService } from './project-tags.service';

@Module({
  controllers: [ProjectTagsController],
  providers: [ProjectTagsService],
  exports: [ProjectTagsService],
})
export class ProjectTagsModule {}
