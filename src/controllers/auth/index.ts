import { NextFunction, Request, Response } from "express";
import authService from "../../services/auth";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(201).send(await authService.signup(req.body));
  } catch (error) {
    return next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send(await authService.login(req.body));
  } catch (error) {
    return next(error);
  }
};

export default {
  login,
  signup,
};
