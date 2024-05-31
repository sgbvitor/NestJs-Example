import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller('/users/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(
    @Body()
    userData: {
      firstName: string;
      lastName: string;
      isActive: boolean;
    },
  ): Promise<UserModel> {
    try {
      return await this.usersService.createUser(userData);
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
  async findAll(): Promise<UserModel[]> {
    try {
      return await this.usersService.findAll();
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Nenhum usuario encontrado',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: e,
        },
      );
    }
  }
  @Get(':idUser')
  async findOne(
    @Param('idUser', ParseIntPipe) idUser: number,
  ): Promise<UserModel | null> {
    try {
      return await this.usersService.findOne(idUser);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Nenhum usuario encontrado',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: e,
        },
      );
    }
  }

  @Patch(':idUser')
  async update(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body()
    userData: {
      firstName: string;
      lastName: string;
      isActive: boolean;
    },
  ): Promise<UserModel> {
    try {
      const where = { idUser };
      const data = userData;
      return await this.usersService.updateUser({ where, data });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Usuário não pode ser atualizado',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  @Delete(':idUser')
  async remove(
    @Param('idUser', ParseIntPipe) idUser: number,
  ): Promise<UserModel> {
    try {
      const where = { idUser };
      return this.usersService.deleteUser(where);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Usuário não pode ser excluído',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: e,
        },
      );
    }
  }
}
