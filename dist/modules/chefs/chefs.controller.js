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
exports.ChefsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const chefs_service_1 = require("./chefs.service");
const create_chef_profile_dto_1 = require("./dto/create-chef-profile.dto");
const update_chef_profile_dto_1 = require("./dto/update-chef-profile.dto");
const search_chefs_dto_1 = require("./dto/search-chefs.dto");
let ChefsController = class ChefsController {
    chefsService;
    constructor(chefsService) {
        this.chefsService = chefsService;
    }
    search(dto) {
        return this.chefsService.search(dto);
    }
    getProfile(id) {
        return this.chefsService.getProfile(id);
    }
    createProfile(user, dto) {
        return this.chefsService.createProfile(user.userId, dto);
    }
    getMyProfile(user) {
        return this.chefsService.getProfileByUserId(user.userId);
    }
    updateProfile(user, dto) {
        return this.chefsService.updateProfile(user.userId, dto);
    }
    setAvailability(user, body) {
        return this.chefsService.setAvailability(user.userId, body.availability);
    }
    addBlockOut(user, body) {
        return this.chefsService.addBlockOutDate(user.userId, body.date);
    }
    removeBlockOut(user, date) {
        return this.chefsService.removeBlockOutDate(user.userId, date);
    }
    pinPost(user, postId) {
        return this.chefsService.pinPost(user.userId, postId);
    }
    unpinPost(user, postId) {
        return this.chefsService.unpinPost(user.userId, postId);
    }
};
exports.ChefsController = ChefsController;
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search and filter chefs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_chefs_dto_1.SearchChefsDto]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chef public profile' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('profile'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Create chef profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_chef_profile_dto_1.CreateChefProfileDto]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "createProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('me/profile'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my chef profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "getMyProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('profile'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Update chef profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_chef_profile_dto_1.UpdateChefProfileDto]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('availability'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Set weekly availability' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "setAvailability", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('blockout'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Add block-out date' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "addBlockOut", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('blockout/:date'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove block-out date' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "removeBlockOut", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('pin/:postId'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Pin a post to chef profile (max 3)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "pinPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('pin/:postId'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Unpin a post' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChefsController.prototype, "unpinPost", null);
exports.ChefsController = ChefsController = __decorate([
    (0, swagger_1.ApiTags)('Chefs'),
    (0, common_1.Controller)('chefs'),
    __metadata("design:paramtypes", [chefs_service_1.ChefsService])
], ChefsController);
//# sourceMappingURL=chefs.controller.js.map