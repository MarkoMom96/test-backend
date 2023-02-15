import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import CreateArticleDto from 'src/dtos/create-article-dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/')
  getAll(@Query('from') from: number, @Query('limit') limit: number): any {
    return this.articleService.getAll(from, limit);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.articleService.getById(id);
  }

  @Post('/')
  addNew(@Body() data: CreateArticleDto) {
    return this.articleService.addNew(data);
  }
  @Post('/many')
  addNewMany(@Body() data: CreateArticleDto[]) {
    return this.articleService.addNewMany(data);
  }
  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    return this.articleService.deleteById(id);
  }
}
