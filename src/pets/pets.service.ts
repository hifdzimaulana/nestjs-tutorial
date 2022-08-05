import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const { userId } = createPetDto;
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user) {
      const pet = this.petRepository.create(createPetDto);
      pet.user = user;
      return this.petRepository.save(pet);
    }

    throw new NotFoundException();
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.find({
      relations: ['user'],
    });
  }

  findOne(id: string): Promise<Pet> {
    return this.petRepository.findOneBy({ id });
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<UpdateResult> {
    const { userId, ...partialPet } = updatePetDto;
    const pet: QueryDeepPartialEntity<Pet> = partialPet;

    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException();
      pet.user = user;
    }

    return this.petRepository.update(id, pet);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.petRepository.delete(id);
  }
}
