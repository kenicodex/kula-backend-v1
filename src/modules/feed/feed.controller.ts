import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FeedService } from './feed.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @ApiOperation({ summary: 'Get main feed (paginated)' })
  getFeed(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.feedService.getFeed(page, limit);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending posts' })
  getTrending(@Query('limit') limit?: number) {
    return this.feedService.getTrendingPosts(limit);
  }

  @Get('hashtag/:tag')
  @ApiOperation({ summary: 'Get posts by hashtag' })
  getByHashtag(@Param('tag') tag: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.feedService.getByHashtag(tag, page, limit);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get posts by a user/chef' })
  getChefPosts(@Param('userId') userId: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.feedService.getChefPosts(userId, page, limit);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get comments on a post' })
  getComments(@Param('id') id: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.feedService.getComments(id, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single post' })
  getPost(@Param('id') id: string) {
    return this.feedService.getPost(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a post' })
  createPost(@CurrentUser() user: any, @Body() dto: CreatePostDto) {
    return this.feedService.createPost(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Like a post' })
  like(@Param('id') id: string) {
    return this.feedService.likePost(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/unlike')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unlike a post' })
  unlike(@Param('id') id: string) {
    return this.feedService.unlikePost(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  @ApiOperation({ summary: 'Add a comment' })
  addComment(@Param('id') id: string, @CurrentUser() user: any, @Body() body: { text: string }) {
    return this.feedService.addComment(id, user.userId, body.text);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':postId/comments/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  deleteComment(@Param('commentId') commentId: string, @CurrentUser() user: any) {
    return this.feedService.deleteComment(commentId, user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post (soft delete)' })
  deletePost(@Param('id') id: string, @CurrentUser() user: any) {
    return this.feedService.deletePost(id, user.userId);
  }
}
