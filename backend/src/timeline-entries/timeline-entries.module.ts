import { Module } from '@nestjs/common';
import { TimelineEntriesController } from './timeline-entries.controller';
import { TimelineEntriesService } from './timeline-entries.service';

@Module({
  controllers: [TimelineEntriesController],
  providers: [TimelineEntriesService],
  exports: [TimelineEntriesService],
})
export class TimelineEntriesModule {}
