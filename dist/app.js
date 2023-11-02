"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const strategies_1 = require("./validation/strategies");
const middlewares_1 = require("./middlewares");
const config_1 = require("./config");
dotenv_1.default.config();
const app = (0, express_1.default)();
passport_1.default.use(strategies_1.jwtStrategy);
app.set("port", config_1.PORT);
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/user", middlewares_1.authenticateUser);
app.use((0, routes_1.default)());
app.get("/ping", (_req, res) => {
    console.log("someone pinged here!!");
    return res.status(200).send({ message: "pong" });
});
app.use(middlewares_1.httpErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map