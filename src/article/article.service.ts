import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import CreateArticleDto from 'src/dtos/create-article-dto';
import { Tag } from 'src/tag/tag.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
  ) {}

  async getAll(from: number, limit: number) {
    let numOfItmes = await this.tagRepo.count();
    if (limit) numOfItmes = limit;

    return await this.articleRepo.findAndCount({
      relations: {
        tag: true,
      },
      order: {
        id: 'ASC',
      },
      skip: from,
      take: numOfItmes,
    });
  }

  async getById(id: number) {
    const tag = await this.articleRepo.findOneBy({ id });
    if (!tag) return 'Article with that id doesnt exist!';

    return tag;
  }

  async addNew(data: CreateArticleDto) {
    const tag = await this.tagRepo.findOneBy({ tagName: data.tag });
    console.log(tag);
    if (!tag) return 'Please Choose an existing tag';
    console.log(data.title.length);
    const article = this.articleRepo.create({
      title: data.title,
      description: data.description,
      tag: tag,
    });
    return this.articleRepo.save(article);
  }
  async addNewMany(data: CreateArticleDto[]) {
    const returnList = [];
    data.map(async (article) => {
      const tag = await this.tagRepo.findOneBy({ tagName: article.tag });
      if (!tag) return;
      const newArticle = this.articleRepo.create({
        title: article.title,
        description: article.description,
        tag: tag,
      });
      console.log('this is the new article:', newArticle);
      this.articleRepo.save(newArticle);
      returnList.push(newArticle);
    });
    console.log('this is a return list', returnList);
    return returnList;
  }

  deleteById(id: number) {
    return this.articleRepo.delete({ id });
  }
}
