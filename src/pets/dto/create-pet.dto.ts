import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsString } from 'class-validator';
import { ANIMAL } from '../entities/pet.entity';

export class CreatePetDto {
  @ApiProperty()
  @IsEnum(ANIMAL)
  type: ANIMAL;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  breed?: string;

  @ApiProperty()
  @IsInt()
  userId: number;
}
