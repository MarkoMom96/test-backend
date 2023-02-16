import { UserService } from './user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import UserDto from 'src/dtos/create-user-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(data: UserDto) {
    const checkUser = await this.userService.getByUsername(data.username);
    if (checkUser) throw new BadRequestException('User already exists');

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    this.userService.addNew({
      username: data.username,
      password: passwordHashString,
    });
  }

  async signin(data: UserDto) {
    const storedUser = await this.userService.getByUsername(data.username);
    if (!storedUser) throw new BadRequestException('Given data is incorrect');

    const storedHash = storedUser.password;

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();
    if (passwordHashString !== storedHash)
      throw new BadRequestException('Given data is incorrect');

    return storedUser;
  }
}
