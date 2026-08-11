import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectCredentialDto } from './create-project-credential.dto';

export class UpdateProjectCredentialDto extends PartialType(
  CreateProjectCredentialDto,
) {}
