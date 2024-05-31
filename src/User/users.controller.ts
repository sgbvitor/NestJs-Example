import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Usuario não pode ser criado',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: e,
        },
      );
    }
  }
  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.usersService.findAll();
  }
  @Get(':idUser')
  async findOne(@Param('idUser') idUser: number): Promise<IUser> {
    return await this.usersService.findOne(idUser);
  }
  @Patch(':idUser')
  async update(
    @Param('idUser') idUser: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.usersService.update(idUser, updateUserDto);
  }
  @Delete(':idUser')
  remove(@Param('idUser') idUser: number): Promise<void> {
    return this.usersService.remove(idUser);
  }
}
