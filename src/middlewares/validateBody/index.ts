import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidatorOptions, validate } from "class-validator";
import { HttpRequestError } from "../../types";
import { isAnEmptyObject } from "../../utils";

export const validateBody = <T>(
  dto: ClassConstructor<T>,
  options?: ValidatorOptions
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async function (req: Request, _res: Response, next: NextFunction) {
    const data = plainToInstance(dto, req.body, {
      excludeExtraneousValues: true,
    });

    if (isAnEmptyObject(data as object)) {
      const httpError = new HttpRequestError(
        "Must provide at least one valid parameter",
        400
      );
      return next(httpError);
    }

    const errors = await validate(data as object, {
      ...options,
      validationError: { target: false },
    });

    if (errors.length) {
      const messages = errors.map(
        (error) => Object.values(error.constraints ?? {})[0]
      );
      const httpError = new HttpRequestError(
        messages.length > 1 ? messages : messages[0],
        400
      );
      return next(httpError);
    }

    req.body = data;
    return next();
  };
};
