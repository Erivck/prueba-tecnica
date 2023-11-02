"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const port = app_1.default.get("port");
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = server;
//# sourceMappingURL=server.js.map