import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'angkon199@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
