import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateTagDto from 'src/dtos/create-tag-dto';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {}

  async getAll() {
    return await this.tagRepo.find();
  }

  async getById(id: number) {
    const tag = await this.tagRepo.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag was not found');

    return tag;
  }

  addNew(tagName: string) {
    const newTag = this.tagRepo.create({ tagName });
    return this.tagRepo.save(newTag);
  }
  addNewMany(tagNames: CreateTagDto[]) {
    const returnList = [];
    tagNames.map((tag) => {
      const newTag = this.tagRepo.create({ tagName: tag.tagName });
      this.tagRepo.save(newTag);
      returnList.push(tag);
    });
    return returnList;
  }
  async editById(id: number, newName: string) {
    const tag = await this.tagRepo.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag was not found!');

    tag.tagName = newName;
    return this.tagRepo.save(tag);
  }
  deleteById(id: number) {
    return this.tagRepo.delete({ id });
  }
}
