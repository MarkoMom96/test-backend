import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import CreateUserDto from 'src/dtos/create-user-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(data: CreateUserDto) {
    const checkUser = await this.userService.getByUsername(data.username);
    if (checkUser) return 'User with this username already exists!';

    const passwordHash = crypto.createHash('sha512');
    console.log(passwordHash);
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    this.userService.addNew({
      username: data.username,
      password: passwordHashString,
    });
  }

  singin() {}
}
