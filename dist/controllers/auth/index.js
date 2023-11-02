"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../services/auth"));
const signup = async (req, res, next) => {
    try {
        return res.status(201).send(await auth_1.default.signup(req.body));
    }
    catch (error) {
        return next(error);
    }
};
const login = async (req, res, next) => {
    try {
        return res.status(200).send(await auth_1.default.login(req.body));
    }
    catch (error) {
        return next(error);
    }
};
exports.default = {
    login,
    signup,
};
//# sourceMappingURL=index.js.map