"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const passport_1 = __importDefault(require("passport"));
const types_1 = require("../../types");
const authenticateUser = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            const httpError = new types_1.HttpRequestError("User is not authorized to access the resource", 401);
            return next(httpError);
        }
        return req.logIn(user, { session: false }, (err) => {
            if (err) {
                return next(err);
            }
            return next();
        });
    })(req, res, next);
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=index.js.map