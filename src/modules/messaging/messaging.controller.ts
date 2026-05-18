import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { MessagingService } from './messaging.service';

@ApiTags('Messaging')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get all my conversations' })
  getConversations(@CurrentUser() user: any) {
    return this.messagingService.getConversations(user.userId);
  }

  @Post('conversations')
  @ApiOperation({ summary: 'Start or get a conversation with another user' })
  startConversation(@CurrentUser() user: any, @Body() body: { recipientId: string; bookingId?: string }) {
    return this.messagingService.getOrCreateConversation(user.userId, body.recipientId, body.bookingId);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Get messages in a conversation (paginated)' })
  getMessages(@Param('id') id: string, @CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.messagingService.getMessages(id, user.userId, page, limit);
  }

  @Post('conversations/:id/messages')
  @ApiOperation({ summary: 'Send a message (REST fallback — use WebSocket for real-time)' })
  sendMessage(@Param('id') id: string, @CurrentUser() user: any, @Body() body: { text: string; mediaUrl?: string }) {
    return this.messagingService.sendMessage(id, user.userId, body.text, body.mediaUrl);
  }

  @Post('conversations/:id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark conversation messages as read' })
  markRead(@Param('id') id: string, @CurrentUser() user: any) {
    return this.messagingService.markRead(id, user.userId);
  }

  @Post('conversations/:id/accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept a message request' })
  acceptRequest(@Param('id') id: string, @CurrentUser() user: any) {
    return this.messagingService.acceptRequest(id, user.userId);
  }

  @Post('conversations/:id/decline')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Decline a message request' })
  declineRequest(@Param('id') id: string, @CurrentUser() user: any) {
    return this.messagingService.declineRequest(id, user.userId);
  }
}
