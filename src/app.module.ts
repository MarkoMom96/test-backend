import { Image } from './article/image.entity';
import { TagService } from './tag/tag.service';
import { Article } from './article/article.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TagController } from './tag/tag.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag/tag.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'demo_db',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: 'root',
      entities: [Tag, User, Article, Image],
      synchronize: true,
    }),
    TagModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
