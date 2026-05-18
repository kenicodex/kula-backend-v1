import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: InstanceType<typeof Stripe>;

  constructor(private config: ConfigService) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2026-04-22.dahlia',
    });
  }

  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>) {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata,
    });
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async refundPayment(paymentIntentId: string, amount?: number) {
    const intent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    if (!intent.latest_charge) throw new BadRequestException('No charge found for this payment');
    return this.stripe.refunds.create({
      charge: intent.latest_charge as string,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
  }

  async createTransfer(amount: number, currency: string, destination: string, metadata?: Record<string, string>) {
    return this.stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      destination,
      metadata,
    });
  }

  constructWebhookEvent(payload: Buffer, signature: string) {
    const secret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!secret) throw new BadRequestException('Webhook secret not configured');
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }
}
