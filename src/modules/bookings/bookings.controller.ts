import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('client')
  @ApiOperation({ summary: 'Create a booking request' })
  create(@CurrentUser() user: any, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user.userId, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my bookings (client)' })
  getMyBookings(@CurrentUser() user: any, @Query('status') status?: string) {
    return this.bookingsService.findByClient(user.userId, status);
  }

  @Get('chef')
  @Roles('chef')
  @ApiOperation({ summary: 'Get bookings for my chef profile' })
  getChefBookings(@CurrentUser() user: any, @Query('status') status?: string) {
    return this.bookingsService.findByChef(user.userId, status);
  }

  @Get('chef/stats')
  @Roles('chef')
  @ApiOperation({ summary: 'Chef booking stats' })
  getStats(@CurrentUser() user: any) {
    return this.bookingsService.getStats(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Patch(':id/confirm')
  @Roles('chef')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Chef confirms a booking' })
  confirm(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookingsService.confirm(id, user.userId);
  }

  @Patch(':id/decline')
  @Roles('chef')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Chef declines a booking' })
  decline(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookingsService.decline(id, user.userId);
  }

  @Patch(':id/cancel')
  @Roles('client')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Client cancels a booking' })
  cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookingsService.cancel(id, user.userId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update booking status (in_progress / completed)' })
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.bookingsService.updateStatus(id, body.status);
  }
}
