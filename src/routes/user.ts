import express from "express";
import userControllers from "../controllers/user";
import { validateBody } from "../middlewares";
import { UserDto } from "../validation";

export default (router: express.Router) => {
  router.get("/user", userControllers.getUser);

  router.patch(
    "/user",
    validateBody(UserDto, { skipMissingProperties: true }),
    userControllers.updateUser
  );

  router.delete("/user", userControllers.deleteUser);
};
