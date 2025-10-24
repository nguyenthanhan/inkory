import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private followsService: FollowsService) {}

  @Post('users/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle follow for a user' })
  async toggle(@Param('userId') userId: string, @Request() req) {
    return this.followsService.toggle(userId, req.user.id);
  }

  @Get('users/:userId/followers')
  @ApiOperation({ summary: 'Get user followers' })
  async getFollowers(@Param('userId') userId: string) {
    return this.followsService.getFollowers(userId);
  }

  @Get('users/:userId/following')
  @ApiOperation({ summary: 'Get users that a user is following' })
  async getFollowing(@Param('userId') userId: string) {
    return this.followsService.getFollowing(userId);
  }

  @Get('users/:userId/check')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check if following a user' })
  async checkFollowing(@Param('userId') userId: string, @Request() req) {
    return this.followsService.checkFollowing(userId, req.user.id);
  }
}
