import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { HttpRequestError } from "../../types";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    function (err: any, user: Express.User) {
      if (err) {
        return next(err);
      }
      if (!user) {
        const httpError = new HttpRequestError(
          "User is not authorized to access the resource",
          401
        );
        return next(httpError);
      }
      return req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        return next();
      });
    }
  )(req, res, next);
};
