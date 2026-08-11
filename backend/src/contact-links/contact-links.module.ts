import { Module } from '@nestjs/common';
import { ContactLinksController } from './contact-links.controller';
import { ContactLinksService } from './contact-links.service';

@Module({
  controllers: [ContactLinksController],
  providers: [ContactLinksService],
  exports: [ContactLinksService],
})
export class ContactLinksModule {}
