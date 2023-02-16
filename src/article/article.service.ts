import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import CreateArticleDto from 'src/dtos/create-article-dto';
import { ImageDto } from 'src/dtos/image-dto';
import { Tag } from 'src/tag/tag.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Image } from './image.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
    @InjectRepository(Image) private imageRepo: Repository<Image>,
  ) {}

  async getAll(from: number, limit: number) {
    let numOfItmes = await this.tagRepo.count();
    if (limit) numOfItmes = limit;

    return await this.articleRepo.findAndCount({
      relations: {
        tag: true,
        image: true,
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
    if (!tag) return 'Please Choose an existing tag';

    const img = await this.imageRepo.findOneBy({ id: data.imageId });
    if (!img) return 'Image not Found!';
    const article = this.articleRepo.create({
      title: data.title,
      description: data.description,
      tag: tag,
      isSmallArticle: data.isSmall,
      image: img,
    });
    return this.articleRepo.save(article);
  }
  async addNewMany(data: CreateArticleDto[]) {
    const returnList = [];
    data.map(async (article) => {
      const tag = await this.tagRepo.findOneBy({ tagName: article.tag });
      if (!tag) return;
      const img = await this.imageRepo.findOneBy({ id: article.imageId });
      if (!img) return;
      const newArticle = this.articleRepo.create({
        title: article.title,
        description: article.description,
        tag: tag,
        isSmallArticle: article.isSmall,
        image: img,
      });

      this.articleRepo.save(newArticle);
      returnList.push(newArticle);
    });
    return returnList;
  }

  deleteById(id: number) {
    return this.articleRepo.delete({ id });
  }

  addImg(image: ImageDto) {
    const newImg = this.imageRepo.create({
      path: image.file.path,
    });
    return this.imageRepo.save(newImg);
  }
}
