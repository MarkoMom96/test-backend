import { AuthGuard } from './../guards/auth.guard';
import { TagService } from './tag.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import CreateTagDto from 'src/dtos/create-tag-dto';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getAll(): any {
    return this.tagService.getAll();
  }
  @UseGuards(AuthGuard)
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.tagService.getById(id);
  }
  @Post('/')
  addNew(@Body() data: CreateTagDto) {
    return this.tagService.addNew(data.tagName);
  }
  @Post('/many')
  addNewMany(@Body() data: CreateTagDto[]) {
    return this.tagService.addNewMany(data);
  }
  @Patch('/:id')
  editById(@Param('id') id: number, @Body() data: CreateTagDto) {
    return this.tagService.editById(id, data.tagName);
  }
  @Delete('/:id')
  DeleteById(@Param('id') id: number) {
    return this.tagService.deleteById(id);
  }
}
