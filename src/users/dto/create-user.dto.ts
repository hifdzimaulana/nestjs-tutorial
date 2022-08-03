import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber('ID')
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
