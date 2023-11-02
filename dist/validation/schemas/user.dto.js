"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../decorators");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, decorators_1.IsValidUsername)(),
    (0, decorators_1.ContainsAtLeastOneLetter)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)()
], UserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)()
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)()
], UserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)()
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)()
], UserDto.prototype, "lastName", void 0);
//# sourceMappingURL=user.dto.js.map