import { Module } from '@nestjs/common';
import { ExperienceHighlightsController } from './experience-highlights.controller';
import { ExperienceHighlightsService } from './experience-highlights.service';

@Module({
  controllers: [ExperienceHighlightsController],
  providers: [ExperienceHighlightsService],
  exports: [ExperienceHighlightsService],
})
export class ExperienceHighlightsModule {}
