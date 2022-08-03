import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({
    required: false,
    oneOf: [{ type: 'number' }, { type: 'string' }],
  })
  phone?: string | number;

  @ApiProperty({ required: false })
  address?: string;
}
