import { IsNotEmpty, IsString } from 'class-validator';

export default class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
