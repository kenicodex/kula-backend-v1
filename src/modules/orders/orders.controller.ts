import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('client')
  @ApiOperation({ summary: 'Place a direct meal order from a chef' })
  create(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user.userId, dto);
  }

  @Get('my')
  @ApiOperation({ summary: "Get client's orders" })
  getMyOrders(@CurrentUser() user: any, @Query('status') status?: string) {
    return this.ordersService.findByClient(user.userId, status);
  }

  @Get('chef')
  @Roles('chef')
  @ApiOperation({ summary: "Get chef's incoming orders" })
  getChefOrders(@CurrentUser() user: any, @Query('status') status?: string) {
    return this.ordersService.findByChef(user.userId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status (confirmed, preparing, ready, delivered)' })
  updateStatus(@Param('id') id: string, @CurrentUser() user: any, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(id, body.status, user.userId);
  }

  @Patch(':id/cancel')
  @Roles('client')
  @ApiOperation({ summary: 'Cancel an order' })
  cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.cancel(id, user.userId);
  }
}
