import { LoginDto, SignupDto } from "../../validation";
import * as argon from "argon2";
import { HttpRequestError, JWTPayload } from "../../types";
import { createUser, getUserByUsername } from "../user";
import { JWT_SECRET } from "../../config";

import jwt from "jsonwebtoken";

const signup = async (dto: SignupDto): Promise<{ access_token: string }> => {
  const user = await createUser(dto);
  return { access_token: signToken(user.id, user.email) };
};

const login = async (dto: LoginDto): Promise<{ access_token: string }> => {
  const user = await getUserByUsername(dto.username);

  if (!user) {
    throw new HttpRequestError("Credentials incorrect", 401);
  }

  const matches = await argon.verify(user.password, dto.password);

  if (!matches) {
    throw new HttpRequestError("Credentials incorrect", 401);
  }

  return { access_token: signToken(user.id, user.email) };
};

const signToken = (userId: string, email: string): string => {
  const payload: JWTPayload = {
    sub: userId,
    email,
  };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });
};

export default {
  signup,
  login,
  signToken
};
