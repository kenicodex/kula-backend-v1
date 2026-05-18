import { Controller, Get, Post, Patch, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { GroceryService } from './grocery.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';

@ApiTags('Grocery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  @Roles('chef')
  @ApiOperation({ summary: 'Chef submits grocery list for a booking' })
  create(@CurrentUser() user: any, @Body() dto: CreateGroceryListDto) {
    return this.groceryService.create(user.userId, dto.bookingId, dto);
  }

  @Get('booking/:bookingId')
  @ApiOperation({ summary: 'Get grocery list for a booking' })
  getByBooking(@Param('bookingId') bookingId: string) {
    return this.groceryService.getByBooking(bookingId);
  }

  @Patch(':id/approve')
  @Roles('client')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Client approves grocery list' })
  approve(@Param('id') id: string, @CurrentUser() user: any) {
    return this.groceryService.approve(id, user.userId);
  }

  @Patch(':id/receipt')
  @Roles('chef')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Chef uploads grocery receipt after purchase' })
  uploadReceipt(@Param('id') id: string, @CurrentUser() user: any, @Body() body: { receiptUrl: string; actualTotal: number }) {
    return this.groceryService.uploadReceipt(id, user.userId, body.receiptUrl, body.actualTotal);
  }
}
