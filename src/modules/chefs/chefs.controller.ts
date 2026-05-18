import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ChefsService } from './chefs.service';
import { CreateChefProfileDto } from './dto/create-chef-profile.dto';
import { UpdateChefProfileDto } from './dto/update-chef-profile.dto';
import { SearchChefsDto } from './dto/search-chefs.dto';

@ApiTags('Chefs')
@Controller('chefs')
export class ChefsController {
  constructor(private readonly chefsService: ChefsService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search and filter chefs' })
  search(@Query() dto: SearchChefsDto) {
    return this.chefsService.search(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chef public profile' })
  getProfile(@Param('id') id: string) {
    return this.chefsService.getProfile(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('profile')
  @Roles('chef')
  @ApiOperation({ summary: 'Create chef profile' })
  createProfile(@CurrentUser() user: any, @Body() dto: CreateChefProfileDto) {
    return this.chefsService.createProfile(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me/profile')
  @Roles('chef')
  @ApiOperation({ summary: 'Get my chef profile' })
  getMyProfile(@CurrentUser() user: any) {
    return this.chefsService.getProfileByUserId(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('profile')
  @Roles('chef')
  @ApiOperation({ summary: 'Update chef profile' })
  updateProfile(@CurrentUser() user: any, @Body() dto: UpdateChefProfileDto) {
    return this.chefsService.updateProfile(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('availability')
  @Roles('chef')
  @ApiOperation({ summary: 'Set weekly availability' })
  setAvailability(@CurrentUser() user: any, @Body() body: { availability: Record<string, any> }) {
    return this.chefsService.setAvailability(user.userId, body.availability);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('blockout')
  @Roles('chef')
  @ApiOperation({ summary: 'Add block-out date' })
  addBlockOut(@CurrentUser() user: any, @Body() body: { date: string }) {
    return this.chefsService.addBlockOutDate(user.userId, body.date);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('blockout/:date')
  @Roles('chef')
  @ApiOperation({ summary: 'Remove block-out date' })
  removeBlockOut(@CurrentUser() user: any, @Param('date') date: string) {
    return this.chefsService.removeBlockOutDate(user.userId, date);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('pin/:postId')
  @Roles('chef')
  @ApiOperation({ summary: 'Pin a post to chef profile (max 3)' })
  pinPost(@CurrentUser() user: any, @Param('postId') postId: string) {
    return this.chefsService.pinPost(user.userId, postId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('pin/:postId')
  @Roles('chef')
  @ApiOperation({ summary: 'Unpin a post' })
  unpinPost(@CurrentUser() user: any, @Param('postId') postId: string) {
    return this.chefsService.unpinPost(user.userId, postId);
  }
}
