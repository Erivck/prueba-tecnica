"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon = __importStar(require("argon2"));
const types_1 = require("../../types");
const user_1 = require("../user");
const config_1 = require("../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (dto) => {
    const user = await (0, user_1.createUser)(dto);
    return { access_token: signToken(user.id, user.email) };
};
const login = async (dto) => {
    const user = await (0, user_1.getUserByUsername)(dto.username);
    if (!user) {
        throw new types_1.HttpRequestError("Credentials incorrect", 401);
    }
    const matches = await argon.verify(user.password, dto.password);
    if (!matches) {
        throw new types_1.HttpRequestError("Credentials incorrect", 401);
    }
    return { access_token: signToken(user.id, user.email) };
};
const signToken = (userId, email) => {
    const payload = {
        sub: userId,
        email,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, {
        expiresIn: "15m",
    });
};
exports.default = {
    signup,
    login,
    signToken
};
//# sourceMappingURL=index.js.map