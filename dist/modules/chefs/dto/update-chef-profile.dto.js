"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChefProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_chef_profile_dto_1 = require("./create-chef-profile.dto");
class UpdateChefProfileDto extends (0, swagger_1.PartialType)(create_chef_profile_dto_1.CreateChefProfileDto) {
}
exports.UpdateChefProfileDto = UpdateChefProfileDto;
//# sourceMappingURL=update-chef-profile.dto.js.map