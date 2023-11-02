"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../controllers/auth"));
const middlewares_1 = require("../middlewares");
const validation_1 = require("../validation");
exports.default = (router) => {
    router.post("/signup", (0, middlewares_1.validateBody)(validation_1.SignupDto), auth_1.default.signup);
    router.post("/login", (0, middlewares_1.validateBody)(validation_1.LoginDto), auth_1.default.login);
};
//# sourceMappingURL=auth.js.map