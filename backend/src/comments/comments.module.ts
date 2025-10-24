import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { Article } from '../entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
