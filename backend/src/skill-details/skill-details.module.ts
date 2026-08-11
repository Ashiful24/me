import { Module } from '@nestjs/common';
import { SkillDetailsController } from './skill-details.controller';
import { SkillDetailsService } from './skill-details.service';

@Module({
  controllers: [SkillDetailsController],
  providers: [SkillDetailsService],
  exports: [SkillDetailsService],
})
export class SkillDetailsModule {}
