import * as Validator from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'image_id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  path: string;

  @OneToMany(() => Article, (article) => article.image, {
    cascade: true,
  })
  articles: Article[];
}
