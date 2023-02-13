import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateTagDto from 'src/dtos/create-tag-dto';

@Controller('tag')
export class TagController {
  @Get('/')
  getAll(): string {
    return 'List of all tags!';
  }
  @Get('/:id')
  getById(@Param('id') id: string): string {
    return 'Tag with id value: ' + id;
  }
  @Post('/')
  addNew(@Body() data: CreateTagDto): string {
    return 'Created tag: ' + data.tagName;
  }
  @Post('/many')
  addNewMany(@Body() data: CreateTagDto[]): CreateTagDto[] {
    const newTags: CreateTagDto[] = [];
    for (const tag of data) newTags.push(tag);
    return newTags;
  }
}
