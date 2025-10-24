import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClapsController } from './claps.controller';
import { ClapsService } from './claps.service';
import { Clap } from '../entities/clap.entity';
import { Article } from '../entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clap, Article])],
  controllers: [ClapsController],
  providers: [ClapsService],
})
export class ClapsModule {}
