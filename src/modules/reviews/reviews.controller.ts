import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('chef/:chefId')
  @ApiOperation({ summary: 'Get reviews for a chef' })
  getChefReviews(@Param('chefId') chefId: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.reviewsService.getChefReviews(chefId, page, limit);
  }

  @Get('chef/:chefId/rating')
  @ApiOperation({ summary: 'Get average rating for a chef' })
  getAverageRating(@Param('chefId') chefId: string) {
    return this.reviewsService.getAverageRating(chefId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('client')
  @ApiOperation({ summary: 'Leave a review for a completed booking' })
  create(@CurrentUser() user: any, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/respond')
  @Roles('chef')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Chef responds to a review' })
  respond(@Param('id') id: string, @CurrentUser() user: any, @Body() body: { response: string }) {
    return this.reviewsService.respondToReview(id, user.userId, body.response);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/flag')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Flag an inappropriate review' })
  flag(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.reviewsService.flagReview(id, body.reason);
  }
}
