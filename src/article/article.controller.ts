import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { FormDataRequest, FileSystemStoredFile } from 'nestjs-form-data';
import CreateArticleDto from 'src/dtos/create-article-dto';
import { ImageDto } from 'src/dtos/image-dto';
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
  /*   @Post('/image')
  @UseInterceptors(FilesInterceptor('file'))
  addNewImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  } */
  @Post('/image')
  @FormDataRequest({
    storage: FileSystemStoredFile,
    fileSystemStoragePath: 'img',
    autoDeleteFile: false,
  })
  addNewImage(@Body() image: ImageDto) {
    console.log(image);
    this.articleService.addImg(image);
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
