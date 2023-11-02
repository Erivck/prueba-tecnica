import {
  UserCreatePayload,
  UserNullable,
  UserPayload,
} from "../../types";
import { User } from "@prisma/client";
import prisma from "../prisma";
import * as argon from "argon2";


export const createUser = async (payload: UserCreatePayload): Promise<User> => {
  const hash = await argon.hash(payload.password); 
  return prisma.user.create({
    data: {
      ...payload,
      password: hash,
    },
  });
};

export const getUsers = async (where?: UserPayload): Promise<User[]> => {
  return prisma.user.findMany({where});
}

export const getUserById = async (id: string): Promise<UserNullable> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByUsername = async (
  username: string
): Promise<UserNullable> => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};


export const updateUserById = async (
  id: string,
  payload: UserPayload
): Promise<User> => {
  const data = payload;
  if (payload.password) {
    data.password = await argon.hash(payload.password);
  }
  return prisma.user.update({
    data,
    where: {
      id,
    },
  });
};

export const updateUserByUsername = async (
  username: string,
  payload: UserPayload
): Promise<User> => {
  const data = payload;
  if (payload.password) {
    data.password = await argon.hash(payload.password);
  }
  return prisma.user.update({
    data,
    where: {
      username,
    },
  });
};

export const deleteUserById = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};
