import { ConfigService } from '@nestjs/config';
export declare class PaymentsService {
    private config;
    private stripe;
    constructor(config: ConfigService);
    createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<import("node_modules/stripe/cjs/lib").Response<import("node_modules/stripe/cjs/resources/PaymentIntents").PaymentIntent>>;
    confirmPaymentIntent(paymentIntentId: string): Promise<import("node_modules/stripe/cjs/lib").Response<import("node_modules/stripe/cjs/resources/PaymentIntents").PaymentIntent>>;
    refundPayment(paymentIntentId: string, amount?: number): Promise<import("node_modules/stripe/cjs/lib").Response<import("node_modules/stripe/cjs/resources/Refunds").Refund>>;
    createTransfer(amount: number, currency: string, destination: string, metadata?: Record<string, string>): Promise<import("node_modules/stripe/cjs/lib").Response<import("node_modules/stripe/cjs/resources/Transfers").Transfer>>;
    constructWebhookEvent(payload: Buffer, signature: string): import("node_modules/stripe/cjs/resources/Events").Event;
}
