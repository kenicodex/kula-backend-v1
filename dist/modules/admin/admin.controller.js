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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAnalytics() {
        return this.adminService.getAnalytics();
    }
    getPendingChefs() {
        return this.adminService.getPendingChefs();
    }
    approveChef(id) {
        return this.adminService.approveChef(id);
    }
    rejectChef(id) {
        return this.adminService.rejectChef(id);
    }
    suspendChef(id) {
        return this.adminService.suspendChef(id);
    }
    getUsers(role, page, limit) {
        return this.adminService.getUsers(role, page, limit);
    }
    suspendUser(id) {
        return this.adminService.suspendUser(id);
    }
    reinstateUser(id) {
        return this.adminService.reinstateUser(id);
    }
    getFlaggedReviews() {
        return this.adminService.getFlaggedReviews();
    }
    unflagReview(id) {
        return this.adminService.unflagReview(id);
    }
    deleteReview(id) {
        return this.adminService.deleteReview(id);
    }
    banHashtag(id) {
        return this.adminService.banHashtag(id);
    }
    featureHashtag(id, body) {
        return this.adminService.featureHashtag(id, body.featured);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Platform analytics dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('chefs/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'List pending chef applications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingChefs", null);
__decorate([
    (0, common_1.Patch)('chefs/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a chef application' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approveChef", null);
__decorate([
    (0, common_1.Patch)('chefs/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a chef application' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "rejectChef", null);
__decorate([
    (0, common_1.Patch)('chefs/:id/suspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend a chef' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "suspendChef", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'List users (with optional role filter)' }),
    __param(0, (0, common_1.Query)('role')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Patch)('users/:id/suspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend a user account' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Patch)('users/:id/reinstate'),
    (0, swagger_1.ApiOperation)({ summary: 'Reinstate a suspended user' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "reinstateUser", null);
__decorate([
    (0, common_1.Get)('reviews/flagged'),
    (0, swagger_1.ApiOperation)({ summary: 'Get flagged reviews for moderation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getFlaggedReviews", null);
__decorate([
    (0, common_1.Patch)('reviews/:id/unflag'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear a review flag' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "unflagReview", null);
__decorate([
    (0, common_1.Delete)('reviews/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a review' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Patch)('hashtags/:id/ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Ban a hashtag' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "banHashtag", null);
__decorate([
    (0, common_1.Patch)('hashtags/:id/feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle hashtag featured status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "featureHashtag", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map