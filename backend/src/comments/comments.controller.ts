import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('comments')
@Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a comment on an article' })
  async create(
    @Param('articleId') articleId: string,
    @Request() req,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(articleId, req.user.id, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for an article' })
  async findByArticle(@Param('articleId') articleId: string) {
    return this.commentsService.findByArticle(articleId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(id, req.user.id);
  }
}
