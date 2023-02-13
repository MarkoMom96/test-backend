import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TagController } from './tag/tag.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TagModule, UserModule, ArticleModule],
  controllers: [AppController, TagController],
  providers: [AppService],
})
export class AppModule {}
