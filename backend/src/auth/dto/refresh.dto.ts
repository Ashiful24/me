import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ description: 'Refresh JWT issued at login' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
