import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import UserDto from 'src/dtos/create-user-dto';
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

  @Post('/signup')
  signup(@Body() data: UserDto) {
    return this.authService.signup(data);
  }
  @Post('/signin')
  async signin(@Body() data: UserDto, @Session() session: any) {
    const user = await this.authService.signin(data);
    session.userId = user.id;
    return user;
  }
  @Post('signout')
  signout(@Session() session) {
    session.userId = null;
  }
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }
}
