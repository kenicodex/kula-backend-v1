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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let HashtagsService = class HashtagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreate(name) {
        const normalized = name.toLowerCase().replace(/^#/, '');
        return this.prisma.hashtag.upsert({
            where: { name: normalized },
            create: { name: normalized },
            update: {},
        });
    }
    async incrementUseCount(names) {
        const normalized = names.map((n) => n.toLowerCase().replace(/^#/, ''));
        await Promise.all(normalized.map((name) => this.prisma.hashtag.upsert({
            where: { name },
            create: { name, useCount: 1 },
            update: { useCount: { increment: 1 } },
        })));
    }
    async trending(limit = 20) {
        return this.prisma.hashtag.findMany({
            where: { isActive: true, isBanned: false },
            orderBy: { useCount: 'desc' },
            take: limit,
        });
    }
    async search(query) {
        const normalized = query.toLowerCase().replace(/^#/, '');
        return this.prisma.hashtag.findMany({
            where: {
                name: { contains: normalized, mode: client_1.Prisma.QueryMode.insensitive },
                isActive: true,
                isBanned: false,
            },
            orderBy: { useCount: 'desc' },
            take: 20,
        });
    }
    async findAll(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.hashtag.findMany({
                orderBy: { useCount: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.hashtag.count(),
        ]);
        return { data, total, page, limit };
    }
    async banHashtag(id) {
        try {
            return await this.prisma.hashtag.update({
                where: { id },
                data: { isBanned: true, isActive: false },
            });
        }
        catch {
            throw new common_1.NotFoundException('Hashtag not found');
        }
    }
    async featureHashtag(id, featured) {
        try {
            return await this.prisma.hashtag.update({
                where: { id },
                data: { isFeatured: featured },
            });
        }
        catch {
            throw new common_1.NotFoundException('Hashtag not found');
        }
    }
};
exports.HashtagsService = HashtagsService;
exports.HashtagsService = HashtagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HashtagsService);
//# sourceMappingURL=hashtags.service.js.map