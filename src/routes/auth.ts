import express from "express";
import authController from "../controllers/auth";
import { validateBody } from "../middlewares";
import { LoginDto, SignupDto } from "../validation";

export default (router: express.Router) => {
  router.post("/signup", validateBody(SignupDto), authController.signup);

  router.post("/login", validateBody(LoginDto), authController.login);
};
