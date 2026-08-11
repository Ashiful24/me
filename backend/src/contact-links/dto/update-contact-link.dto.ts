import { PartialType } from '@nestjs/mapped-types';
import { CreateContactLinkDto } from './create-contact-link.dto';

export class UpdateContactLinkDto extends PartialType(CreateContactLinkDto) {}
