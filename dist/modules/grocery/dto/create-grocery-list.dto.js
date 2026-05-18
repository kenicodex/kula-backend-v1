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
exports.CreateGroceryListDto = exports.GroceryItemDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class GroceryItemDto {
    name;
    quantity;
    estimatedCost;
}
exports.GroceryItemDto = GroceryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GroceryItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GroceryItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GroceryItemDto.prototype, "estimatedCost", void 0);
class CreateGroceryListDto {
    bookingId;
    items;
    budgetCap;
    paymentMethod;
}
exports.CreateGroceryListDto = CreateGroceryListDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroceryListDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [GroceryItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GroceryItemDto),
    __metadata("design:type", Array)
], CreateGroceryListDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateGroceryListDto.prototype, "budgetCap", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['app_payment', 'chef_pays', 'client_handles'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['app_payment', 'chef_pays', 'client_handles']),
    __metadata("design:type", String)
], CreateGroceryListDto.prototype, "paymentMethod", void 0);
//# sourceMappingURL=create-grocery-list.dto.js.map