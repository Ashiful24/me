import { Module } from '@nestjs/common';
import { SkillGroupsController } from './skill-groups.controller';
import { SkillGroupsService } from './skill-groups.service';

@Module({
  controllers: [SkillGroupsController],
  providers: [SkillGroupsService],
  exports: [SkillGroupsService],
})
export class SkillGroupsModule {}
