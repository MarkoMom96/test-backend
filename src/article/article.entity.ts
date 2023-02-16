import * as Validator from 'class-validator';
import { Tag } from 'src/tag/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'article_id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MinLength(10)
  @Validator.MaxLength(50)
  title: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MinLength(10)
  @Validator.MaxLength(100)
  description: string;

  @Column({
    name: 'is_small',
    type: 'tinyint',
    unsigned: true,
    default: () => "'0'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0, 1])
  isSmallArticle: number; // weather or no to use small article box

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Image;
}
