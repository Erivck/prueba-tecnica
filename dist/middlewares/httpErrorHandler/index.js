"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorHandler = void 0;
const types_1 = require("../../types");
const config_1 = require("../../config");
const httpErrorHandler = (error, _req, res, _next) => {
    if (config_1.LOG_ERRORS_TO_CONSOLE) {
        console.log({ error });
    }
    const httpError = types_1.HttpRequestError.getFromError(error).getObject();
    return res.status(httpError.statusCode).send(httpError);
};
exports.httpErrorHandler = httpErrorHandler;
//# sourceMappingURL=index.js.map