import { ApiProperty } from '@nestjs/swagger';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  phone?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  address?: string;

  @OneToMany((type) => Pet, (pet) => pet.user, { onDelete: 'CASCADE' })
  pets: Pet[];
}
