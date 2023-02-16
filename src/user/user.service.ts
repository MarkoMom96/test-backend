import { Repository } from 'typeorm';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UserDto from 'src/dtos/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async getAll() {
    return await this.userRepo.find();
  }
  async getById(id: number) {
    if (!id) return null;
    console.log('ovo je getBId ', id);
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User was not found');
    return user;
  }
  async getByUsername(username: string) {
    return await this.userRepo.findOneBy({ username });
  }

  addNew(data: UserDto) {
    const newUser = this.userRepo.create({
      username: data.username,
      password: data.password,
    });
    return this.userRepo.save(newUser);
  }
}
