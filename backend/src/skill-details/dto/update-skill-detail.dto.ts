import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDetailDto } from './create-skill-detail.dto';

export class UpdateSkillDetailDto extends PartialType(CreateSkillDetailDto) {}
