import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceHighlightDto } from './create-experience-highlight.dto';

export class UpdateExperienceHighlightDto extends PartialType(
  CreateExperienceHighlightDto,
) {}
