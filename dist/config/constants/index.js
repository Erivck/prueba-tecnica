"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_ERRORS_TO_CONSOLE = exports.DB_URL = exports.JWT_SECRET = exports.PORT = void 0;
exports.PORT = Number(process.env.PORT) ?? 3000;
exports.JWT_SECRET = process.env.JWT_SECRET ?? "";
exports.DB_URL = process.env.DATABASE_URL;
exports.LOG_ERRORS_TO_CONSOLE = process.env.LOG_ERRORS_TO_CONSOLE === "true" ? true : false;
//# sourceMappingURL=index.js.map