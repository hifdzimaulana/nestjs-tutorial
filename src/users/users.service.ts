import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Muller', address: 'Munich' },
    { id: 2, name: 'Kevin', address: 'Manchester', phone: 85664 },
  ];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id === id);
    let user = this.users[index];
    if (user) {
      user = { ...user, ...updateUserDto };
      this.users[index] = user;
    }
    return user;
  }

  remove(id: number): string {
    this.users.splice(id - 1, 1);
    return `This action removes a #${id} user`;
  }
}
