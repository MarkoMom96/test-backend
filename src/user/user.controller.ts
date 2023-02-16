import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateUserDto from 'src/dtos/create-user-dto';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/')
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Post('/')
  singup(@Body() data: CreateUserDto) {
    return this.authService.signup(data);
  }
}
