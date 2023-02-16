import { TagService } from './../tag/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { Tag } from 'src/tag/tag.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Image } from './image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Tag, Image]),
    NestjsFormDataModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
