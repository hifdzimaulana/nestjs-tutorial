import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ANIMAL {
  DOG = 'dog',
  FISH = 'fish',
  CAT = 'cat',
}

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ type: 'enum', enum: ANIMAL })
  @ApiProperty()
  type: ANIMAL;

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
