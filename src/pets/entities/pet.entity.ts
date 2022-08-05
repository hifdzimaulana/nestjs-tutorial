import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ type: 'enum', enum: ['dog', 'fish', 'cat'] })
  @ApiProperty()
  type: 'dog' | 'fish' | 'cat';

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  breed?: string;

  @ManyToOne((type) => User, (user) => user.pets, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
