"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUsername = void 0;
const class_validator_1 = require("class-validator");
function IsValidUsername(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: Object.assign({
                message: `${propertyName} must contain only letters, numbers or '_' character`
            }, validationOptions),
            constraints: [],
            validator: {
                validate(value, _) {
                    const pattern = /^\w+$/;
                    return typeof value == "string" && pattern.test(value);
                }
            }
        });
    };
}
exports.IsValidUsername = IsValidUsername;
//# sourceMappingURL=isValidUsername.js.map