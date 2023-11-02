import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const HttpErrorString: Record<number, string> = {
  [400]: "Bad request",
  [401]: "Unauthorized",
  [403]: "Forbidden",
  [404]: "Resource not found",
  [500]: "Internal server error",
};

type HttpRequestErrorArguments = {
  statusCode: number;
  message: string;
};

const prismaErrorCodeProperties: Record<string, HttpRequestErrorArguments> = {
  P2002: {
    statusCode: 403,
    message: "Credentials taken",
  },
};

export class HttpRequestError extends Error {
  statusCode: number;
  httpError: string;
  messages?: string[];

  constructor(msg?: string | string[], statusCode: number = 500) {
    if (msg instanceof Array) {
      super(msg[0]);
      this.messages = msg;
    } else {
      super(msg);
    }
    Object.setPrototypeOf(this, HttpRequestError.prototype);
    this.statusCode = statusCode;
    this.httpError = HttpErrorString[statusCode];
  }

  getObject() {
    if (this.message) {
      return {
        statusCode: this.statusCode,
        message: this.messages ?? this.message,
        error: this.httpError
      }
    }
    return {
      statusCode: this.statusCode,
      error: this.httpError,
    };
  }

  static getFromPrismaRequestError(
    error: PrismaClientKnownRequestError
  ): HttpRequestError {
    const props = prismaErrorCodeProperties[error.code];
    if (props) {
      return new HttpRequestError(props.message, props.statusCode);
    }
    return new HttpRequestError();
  }

  static getFromError(error: unknown): HttpRequestError {
    if (error instanceof HttpRequestError) return error;
    else if (error instanceof PrismaClientKnownRequestError) {
      return this.getFromPrismaRequestError(error);
    } else if (error instanceof Error) {
      return new HttpRequestError(error.message);
    }
    return new HttpRequestError();
  }
}
