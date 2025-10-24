import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  async findAll() {
    return this.tagsService.findAll();
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular tags' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findPopular(@Query('limit') limit?: number) {
    return this.tagsService.findPopular(limit);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get tag by name' })
  async findOne(@Param('name') name: string) {
    return this.tagsService.findOne(name);
  }
}
