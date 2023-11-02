"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const user_1 = require("../../services/user");
const config_1 = require("../../config");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
exports.jwtStrategy = new passport_jwt_1.default.Strategy({
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: config_1.JWT_SECRET,
}, async (payload, done) => {
    try {
        const user = await (0, user_1.getUserById)(payload.sub);
        if (!user) {
            return done(new types_1.HttpRequestError("User not found", 401));
        }
        const userWithoutPassword = (0, utils_1.omitPropertyFromObject)(user, "password");
        return done(null, userWithoutPassword);
    }
    catch (error) {
        return done(error);
    }
});
//# sourceMappingURL=jwt.strategy.js.map