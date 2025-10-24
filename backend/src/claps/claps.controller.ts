import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClapsService } from './claps.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('claps')
@Controller('articles/:articleId/claps')
export class ClapsController {
  constructor(private clapsService: ClapsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clap for an article' })
  async clap(
    @Param('articleId') articleId: string,
    @Request() req,
    @Body('count') count?: number,
  ) {
    return this.clapsService.clap(articleId, req.user.id, count);
  }

  @Get()
  @ApiOperation({ summary: 'Get claps count for an article' })
  async getClapsForArticle(@Param('articleId') articleId: string) {
    return this.clapsService.getClapsForArticle(articleId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user claps for an article' })
  async getUserClapForArticle(
    @Param('articleId') articleId: string,
    @Request() req,
  ) {
    return this.clapsService.getUserClapForArticle(articleId, req.user.id);
  }
}
