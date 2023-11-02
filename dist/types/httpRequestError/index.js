"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestError = exports.HttpErrorString = void 0;
const library_1 = require("@prisma/client/runtime/library");
exports.HttpErrorString = {
    [400]: "Bad request",
    [401]: "Unauthorized",
    [403]: "Forbidden",
    [404]: "Resource not found",
    [500]: "Internal server error",
};
const prismaErrorCodeProperties = {
    P2002: {
        statusCode: 403,
        message: "Credentials taken",
    },
};
class HttpRequestError extends Error {
    constructor(msg, statusCode = 500) {
        if (msg instanceof Array) {
            super(msg[0]);
            this.messages = msg;
        }
        else {
            super(msg);
        }
        Object.setPrototypeOf(this, HttpRequestError.prototype);
        this.statusCode = statusCode;
        this.httpError = exports.HttpErrorString[statusCode];
    }
    getObject() {
        if (this.message) {
            return {
                statusCode: this.statusCode,
                message: this.messages ?? this.message,
                error: this.httpError
            };
        }
        return {
            statusCode: this.statusCode,
            error: this.httpError,
        };
    }
    static getFromPrismaRequestError(error) {
        const props = prismaErrorCodeProperties[error.code];
        if (props) {
            return new HttpRequestError(props.message, props.statusCode);
        }
        return new HttpRequestError();
    }
    static getFromError(error) {
        if (error instanceof HttpRequestError)
            return error;
        else if (error instanceof library_1.PrismaClientKnownRequestError) {
            return this.getFromPrismaRequestError(error);
        }
        else if (error instanceof Error) {
            return new HttpRequestError(error.message);
        }
        return new HttpRequestError();
    }
}
exports.HttpRequestError = HttpRequestError;
//# sourceMappingURL=index.js.map