import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Article } from '../entities/article.entity';
import { Tag } from '../entities/tag.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(userId: string, createArticleDto: CreateArticleDto) {
    const { tags: tagNames, ...articleData } = createArticleDto;

    // Calculate reading time (average 200 words per minute)
    const wordCount = articleData.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const article = this.articleRepository.create({
      ...articleData,
      authorId: userId,
      readingTime,
    });

    // Handle tags
    if (tagNames && tagNames.length > 0) {
      const tags = await Promise.all(
        tagNames.map(async (tagName) => {
          let tag = await this.tagRepository.findOne({
            where: { name: tagName.toLowerCase() },
          });

          if (!tag) {
            tag = this.tagRepository.create({ name: tagName.toLowerCase() });
            await this.tagRepository.save(tag);
          }

          return tag;
        }),
      );

      article.tags = tags;
    }

    return this.articleRepository.save(article);
  }

  async findAll(page = 1, limit = 10, tag?: string) {
    const skip = (page - 1) * limit;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.claps', 'claps')
      .where('article.published = :published', { published: true })
      .orderBy('article.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (tag) {
      queryBuilder.andWhere('tags.name = :tag', { tag: tag.toLowerCase() });
    }

    const [articles, total] = await queryBuilder.getManyAndCount();

    return {
      data: articles.map((article) => ({
        ...article,
        clapsCount: article.claps?.length || 0,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author', 'tags', 'claps', 'comments', 'comments.author'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Increment view count
    article.viewCount += 1;
    await this.articleRepository.save(article);

    return {
      ...article,
      clapsCount: article.claps?.length || 0,
      commentsCount: article.comments?.length || 0,
    };
  }

  async update(
    id: string,
    userId: string,
    updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('You can only update your own articles');
    }

    const { tags: tagNames, ...articleData } = updateArticleDto;

    // Update reading time if content changed
    if (articleData.content) {
      const wordCount = articleData.content.split(/\s+/).length;
      articleData['readingTime'] = Math.ceil(wordCount / 200);
    }

    Object.assign(article, articleData);

    // Handle tags update
    if (tagNames) {
      const tags = await Promise.all(
        tagNames.map(async (tagName) => {
          let tag = await this.tagRepository.findOne({
            where: { name: tagName.toLowerCase() },
          });

          if (!tag) {
            tag = this.tagRepository.create({ name: tagName.toLowerCase() });
            await this.tagRepository.save(tag);
          }

          return tag;
        }),
      );

      article.tags = tags;
    }

    return this.articleRepository.save(article);
  }

  async remove(id: string, userId: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own articles');
    }

    await this.articleRepository.remove(article);

    return { message: 'Article deleted successfully' };
  }

  async getUserArticles(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [articles, total] = await this.articleRepository.findAndCount({
      where: { authorId: userId },
      relations: ['author', 'tags', 'claps'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: articles.map((article) => ({
        ...article,
        clapsCount: article.claps?.length || 0,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async search(query: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [articles, total] = await this.articleRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`), published: true },
        { subtitle: ILike(`%${query}%`), published: true },
        { content: ILike(`%${query}%`), published: true },
      ],
      relations: ['author', 'tags', 'claps'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: articles.map((article) => ({
        ...article,
        clapsCount: article.claps?.length || 0,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFeed(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // Get articles from followed users
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.claps', 'claps')
      .leftJoin('author.followers', 'follow')
      .where('follow.followerId = :userId', { userId })
      .andWhere('article.published = :published', { published: true })
      .orderBy('article.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const [data, total] = articles;

    return {
      data: data.map((article) => ({
        ...article,
        clapsCount: article.claps?.length || 0,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
