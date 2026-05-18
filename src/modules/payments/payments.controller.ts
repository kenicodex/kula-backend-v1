import { Controller, Post, Body, UseGuards, Headers, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('intent')
  @ApiOperation({ summary: 'Create a Stripe PaymentIntent for a booking or order' })
  createIntent(@CurrentUser() user: any, @Body() dto: CreatePaymentIntentDto) {
    return this.paymentsService.createPaymentIntent(dto.amount, dto.currency, {
      referenceId: dto.referenceId,
      referenceType: dto.referenceType,
      userId: user.userId,
    });
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook endpoint — register this URL in your Stripe dashboard' })
  webhook(@Req() req: RawBodyRequest, @Headers('stripe-signature') sig: string) {
    if (!req.rawBody || !sig) return { received: false };
    const event = this.paymentsService.constructWebhookEvent(req.rawBody, sig);
    return { received: true, type: event.type };
  }
}
