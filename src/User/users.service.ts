import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(idUser: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ idUser });
  }

  async update(idUser: number, user: User): Promise<void> {
    await this.usersRepository.update(idUser, user);
  }

  async remove(idUser: number): Promise<void> {
    await this.usersRepository.delete(idUser);
  }
}
