"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const validateBody = (dto, options) => {
    return async function (req, _res, next) {
        const data = (0, class_transformer_1.plainToInstance)(dto, req.body, {
            excludeExtraneousValues: true,
        });
        if ((0, utils_1.isAnEmptyObject)(data)) {
            const httpError = new types_1.HttpRequestError("Must provide at least one valid parameter", 400);
            return next(httpError);
        }
        const errors = await (0, class_validator_1.validate)(data, {
            ...options,
            validationError: { target: false },
        });
        if (errors.length) {
            const messages = errors.map((error) => Object.values(error.constraints ?? {})[0]);
            const httpError = new types_1.HttpRequestError(messages.length > 1 ? messages : messages[0], 400);
            return next(httpError);
        }
        req.body = data;
        return next();
    };
};
exports.validateBody = validateBody;
//# sourceMappingURL=index.js.map