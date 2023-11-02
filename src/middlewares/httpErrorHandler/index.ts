import { NextFunction, Request, Response } from "express";
import { HttpRequestError } from "../../types";
import { LOG_ERRORS_TO_CONSOLE } from "../../config";

export const httpErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (LOG_ERRORS_TO_CONSOLE) {
    console.log({ error });
  }
  const httpError = HttpRequestError.getFromError(error).getObject();
  return res.status(httpError.statusCode).send(httpError);
};
