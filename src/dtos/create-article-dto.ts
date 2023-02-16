import { IsNotEmpty, IsString } from 'class-validator';
import * as Validator from 'class-validator';
import { IsNumber } from 'class-validator';
import CreateTagDto from './create-tag-dto';
import { Tag } from 'src/tag/tag.entity';

export default class CreateArticleDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MinLength(10)
  @Validator.MaxLength(50)
  title: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MinLength(10)
  @Validator.MaxLength(100)
  description: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  tag: string;

  @Validator.IsNotEmpty()
  @Validator.IsIn([0, 1])
  isSmall: 0 | 1;

  @Validator.IsNotEmpty()
  @IsNumber()
  imageId: number;
}
