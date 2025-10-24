import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from '../entities/bookmark.entity';
import { Article } from '../entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Article])],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
