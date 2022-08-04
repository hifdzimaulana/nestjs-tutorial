import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { NotFoundFilter } from './filters/not-found.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@UseFilters(new NotFoundFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiAcceptedResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    const user = this.usersService.update(+id, updateUserDto);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(AuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto): object {
    return {
      accessToken: 'asdjkfasdfasdf.asdf0w9034t09qiafla.9q3rf',
    };
  }
}
