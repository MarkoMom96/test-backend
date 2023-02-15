import * as Validator from 'class-validator';
import { Tag } from 'src/tag/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';

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

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;
}
