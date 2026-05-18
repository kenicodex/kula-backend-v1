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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hashtags_service_1 = require("./hashtags.service");
let HashtagsController = class HashtagsController {
    hashtagsService;
    constructor(hashtagsService) {
        this.hashtagsService = hashtagsService;
    }
    trending(limit) {
        return this.hashtagsService.trending(limit);
    }
    search(q) {
        return this.hashtagsService.search(q ?? '');
    }
};
exports.HashtagsController = HashtagsController;
__decorate([
    (0, common_1.Get)('trending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trending hashtags' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HashtagsController.prototype, "trending", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search hashtags by name' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HashtagsController.prototype, "search", null);
exports.HashtagsController = HashtagsController = __decorate([
    (0, swagger_1.ApiTags)('Hashtags'),
    (0, common_1.Controller)('hashtags'),
    __metadata("design:paramtypes", [hashtags_service_1.HashtagsService])
], HashtagsController);
//# sourceMappingURL=hashtags.controller.js.map