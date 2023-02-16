import { Repository } from 'typeorm';
import { Injectable, Param } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/dtos/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async getAll() {
    return await this.userRepo.find();
  }
  async getById(id: number) {
    return await this.userRepo.findOneBy({ id });
  }
  async getByUsername(username: string) {
    return await this.userRepo.findOneBy({ username });
  }

  addNew(data: CreateUserDto) {
    const newUser = this.userRepo.create({
      username: data.username,
      password: data.password,
    });
    return this.userRepo.save(newUser);
  }
}
