import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateTagDto from 'src/dtos/create-tag-dto';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {}

  async getAll(from: number, limit: number) {
    let numOfItmes = await this.tagRepo.count();
    if (limit) numOfItmes = limit;

    return await this.tagRepo.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: from,
      take: numOfItmes,
    });
  }

  async getById(id: number) {
    const tag = await this.tagRepo.findOneBy({ id: id });
    if (tag) return tag;

    return 'Tag with that id doesnt exist!';
  }

  addNew(tagName: string) {
    const newTag = this.tagRepo.create({ tagName });
    return this.tagRepo.save(newTag);
  }
  addNewMany(tagNames: CreateTagDto[]) {
    let returnList = [];
    for (const tag of tagNames) {
      this.tagRepo.create({ tagName: tag.tagName });
      this.tagRepo.save(tag);
      returnList.push(tag);
    }
    return returnList;
  }
  async editById(id: number, newName: string) {
    const tag = await this.tagRepo.findOneBy({ id: id });
    if (!tag) return "'Tag with that id doesnt exist!';";

    tag.tagName = newName;
    return this.tagRepo.save(tag);
  }
  deleteById(id: number) {
    return this.tagRepo.delete({ id: id });
  }
}
