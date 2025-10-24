import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clap } from '../entities/clap.entity';
import { Article } from '../entities/article.entity';

@Injectable()
export class ClapsService {
  constructor(
    @InjectRepository(Clap)
    private clapRepository: Repository<Clap>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async clap(articleId: string, userId: string, count = 1) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    let clap = await this.clapRepository.findOne({
      where: { articleId, userId },
    });

    if (clap) {
      // Increment existing clap (max 50 claps per user)
      clap.count = Math.min(clap.count + count, 50);
      return this.clapRepository.save(clap);
    } else {
      // Create new clap
      clap = this.clapRepository.create({
        articleId,
        userId,
        count: Math.min(count, 50),
      });
      return this.clapRepository.save(clap);
    }
  }

  async getClapsForArticle(articleId: string) {
    const claps = await this.clapRepository.find({
      where: { articleId },
    });

    const totalClaps = claps.reduce((sum, clap) => sum + clap.count, 0);

    return {
      totalClaps,
      uniqueUsers: claps.length,
    };
  }

  async getUserClapForArticle(articleId: string, userId: string) {
    const clap = await this.clapRepository.findOne({
      where: { articleId, userId },
    });

    return clap ? { count: clap.count } : { count: 0 };
  }
}
