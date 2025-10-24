import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.articles', 'article')
      .loadRelationCountAndMap('tag.articlesCount', 'tag.articles')
      .orderBy('tag.name', 'ASC')
      .getMany();

    return tags;
  }

  async findPopular(limit = 10) {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.articles', 'article')
      .addSelect('COUNT(article.id)', 'articleCount')
      .groupBy('tag.id')
      .orderBy('articleCount', 'DESC')
      .limit(limit)
      .getMany();

    return tags;
  }

  async findOne(name: string) {
    const tag = await this.tagRepository.findOne({
      where: { name: name.toLowerCase() },
      relations: ['articles', 'articles.author'],
    });

    return tag;
  }
}
