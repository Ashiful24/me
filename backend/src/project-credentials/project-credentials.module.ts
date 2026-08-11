import { Module } from '@nestjs/common';
import { ProjectCredentialsController } from './project-credentials.controller';
import { ProjectCredentialsService } from './project-credentials.service';

@Module({
  controllers: [ProjectCredentialsController],
  providers: [ProjectCredentialsService],
  exports: [ProjectCredentialsService],
})
export class ProjectCredentialsModule {}
