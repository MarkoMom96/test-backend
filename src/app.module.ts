import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TagController } from './tag/tag.controller';

@Module({
  imports: [TagModule],
  controllers: [AppController, TagController],
  providers: [AppService],
})
export class AppModule {}
