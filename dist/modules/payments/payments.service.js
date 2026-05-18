"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
let PaymentsService = class PaymentsService {
    config;
    stripe;
    constructor(config) {
        this.config = config;
        this.stripe = new stripe_1.default(this.config.get('STRIPE_SECRET_KEY') ?? '', {
            apiVersion: '2026-04-22.dahlia',
        });
    }
    async createPaymentIntent(amount, currency, metadata) {
        return this.stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: currency.toLowerCase(),
            metadata,
        });
    }
    async confirmPaymentIntent(paymentIntentId) {
        return this.stripe.paymentIntents.retrieve(paymentIntentId);
    }
    async refundPayment(paymentIntentId, amount) {
        const intent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
        if (!intent.latest_charge)
            throw new common_1.BadRequestException('No charge found for this payment');
        return this.stripe.refunds.create({
            charge: intent.latest_charge,
            amount: amount ? Math.round(amount * 100) : undefined,
        });
    }
    async createTransfer(amount, currency, destination, metadata) {
        return this.stripe.transfers.create({
            amount: Math.round(amount * 100),
            currency: currency.toLowerCase(),
            destination,
            metadata,
        });
    }
    constructWebhookEvent(payload, signature) {
        const secret = this.config.get('STRIPE_WEBHOOK_SECRET');
        if (!secret)
            throw new common_1.BadRequestException('Webhook secret not configured');
        return this.stripe.webhooks.constructEvent(payload, signature, secret);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map