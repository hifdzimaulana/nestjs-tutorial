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
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.update(+id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.usersService.remove(+id);
    if (result.affected == 0) {
      throw new NotFoundException();
    }
    return result;
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
