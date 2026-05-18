import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics')
  @ApiOperation({ summary: 'Platform analytics dashboard' })
  getAnalytics() {
    return this.adminService.getAnalytics();
  }

  @Get('chefs/pending')
  @ApiOperation({ summary: 'List pending chef applications' })
  getPendingChefs() {
    return this.adminService.getPendingChefs();
  }

  @Patch('chefs/:id/approve')
  @ApiOperation({ summary: 'Approve a chef application' })
  approveChef(@Param('id') id: string) {
    return this.adminService.approveChef(id);
  }

  @Patch('chefs/:id/reject')
  @ApiOperation({ summary: 'Reject a chef application' })
  rejectChef(@Param('id') id: string) {
    return this.adminService.rejectChef(id);
  }

  @Patch('chefs/:id/suspend')
  @ApiOperation({ summary: 'Suspend a chef' })
  suspendChef(@Param('id') id: string) {
    return this.adminService.suspendChef(id);
  }

  @Get('users')
  @ApiOperation({ summary: 'List users (with optional role filter)' })
  getUsers(@Query('role') role?: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.adminService.getUsers(role, page, limit);
  }

  @Patch('users/:id/suspend')
  @ApiOperation({ summary: 'Suspend a user account' })
  suspendUser(@Param('id') id: string) {
    return this.adminService.suspendUser(id);
  }

  @Patch('users/:id/reinstate')
  @ApiOperation({ summary: 'Reinstate a suspended user' })
  reinstateUser(@Param('id') id: string) {
    return this.adminService.reinstateUser(id);
  }

  @Get('reviews/flagged')
  @ApiOperation({ summary: 'Get flagged reviews for moderation' })
  getFlaggedReviews() {
    return this.adminService.getFlaggedReviews();
  }

  @Patch('reviews/:id/unflag')
  @ApiOperation({ summary: 'Clear a review flag' })
  unflagReview(@Param('id') id: string) {
    return this.adminService.unflagReview(id);
  }

  @Delete('reviews/:id')
  @ApiOperation({ summary: 'Delete a review' })
  deleteReview(@Param('id') id: string) {
    return this.adminService.deleteReview(id);
  }

  @Patch('hashtags/:id/ban')
  @ApiOperation({ summary: 'Ban a hashtag' })
  banHashtag(@Param('id') id: string) {
    return this.adminService.banHashtag(id);
  }

  @Patch('hashtags/:id/feature')
  @ApiOperation({ summary: 'Toggle hashtag featured status' })
  featureHashtag(@Param('id') id: string, @Body() body: { featured: boolean }) {
    return this.adminService.featureHashtag(id, body.featured);
  }
}
