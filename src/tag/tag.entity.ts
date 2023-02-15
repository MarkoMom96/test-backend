import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as Validator from 'class-validator';
import { Article } from 'src/article/article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'tag_id', unsigned: true })
  id: number;

  @Column({ name: 'tag_name' })
  @Validator.IsString()
  @Validator.IsNotEmpty()
  tagName: string;

  @OneToMany(() => Article, (article) => article.tag, {
    cascade: true,
  })
  articles: Article[];
}
