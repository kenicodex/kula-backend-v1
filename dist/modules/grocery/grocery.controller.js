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
exports.GroceryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const grocery_service_1 = require("./grocery.service");
const create_grocery_list_dto_1 = require("./dto/create-grocery-list.dto");
let GroceryController = class GroceryController {
    groceryService;
    constructor(groceryService) {
        this.groceryService = groceryService;
    }
    create(user, dto) {
        return this.groceryService.create(user.userId, dto.bookingId, dto);
    }
    getByBooking(bookingId) {
        return this.groceryService.getByBooking(bookingId);
    }
    approve(id, user) {
        return this.groceryService.approve(id, user.userId);
    }
    uploadReceipt(id, user, body) {
        return this.groceryService.uploadReceipt(id, user.userId, body.receiptUrl, body.actualTotal);
    }
};
exports.GroceryController = GroceryController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('chef'),
    (0, swagger_1.ApiOperation)({ summary: 'Chef submits grocery list for a booking' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_grocery_list_dto_1.CreateGroceryListDto]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('booking/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get grocery list for a booking' }),
    __param(0, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "getByBooking", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, roles_decorator_1.Roles)('client'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Client approves grocery list' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/receipt'),
    (0, roles_decorator_1.Roles)('chef'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Chef uploads grocery receipt after purchase' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "uploadReceipt", null);
exports.GroceryController = GroceryController = __decorate([
    (0, swagger_1.ApiTags)('Grocery'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('grocery'),
    __metadata("design:paramtypes", [grocery_service_1.GroceryService])
], GroceryController);
//# sourceMappingURL=grocery.controller.js.map