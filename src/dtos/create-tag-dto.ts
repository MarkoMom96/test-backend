import { IsString } from 'class-validator';

export default class CreateTagDto {
  @IsString()
  tagName: string;
}
