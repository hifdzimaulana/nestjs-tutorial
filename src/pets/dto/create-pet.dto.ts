import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString } from 'class-validator';

export class CreatePetDto {
  @ApiProperty()
  @IsIn(['dog', 'fish', 'cat'])
  type: 'dog' | 'fish' | 'cat';

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
