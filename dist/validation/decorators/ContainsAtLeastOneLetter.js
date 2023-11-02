"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsAtLeastOneLetter = void 0;
const class_validator_1 = require("class-validator");
function ContainsAtLeastOneLetter(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: Object.assign({
                message: `${propertyName} must contain at least one letter`
            }, validationOptions),
            constraints: [],
            validator: {
                validate(value, _) {
                    const pattern = /[a-zA-Z]/;
                    return typeof value == "string" && pattern.test(value);
                }
            }
        });
    };
}
exports.ContainsAtLeastOneLetter = ContainsAtLeastOneLetter;
//# sourceMappingURL=ContainsAtLeastOneLetter.js.map