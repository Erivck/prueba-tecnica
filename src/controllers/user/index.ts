import { NextFunction, Request, Response } from "express";
import { updateUserById, deleteUserById } from "../../services/user";
import { UserWithoutPassword } from "../../types";
import { omitPropertyFromObject } from "../../utils";
import { UserDto } from "validation";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send({ user: req.user });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserWithoutPassword;
    const dto: UserDto = req.body;
    const userUpdated = await updateUserById(user.id, dto);
    return res.status(200).send({
      message: "User updated",
      user: omitPropertyFromObject(userUpdated, "password"),
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserWithoutPassword;
    const userDeleted = await deleteUserById(user.id);
    return res.status(200).send({
      message: "User deleted",
      user: omitPropertyFromObject(userDeleted, "password"),
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  getUser,
  updateUser,
  deleteUser,
};
