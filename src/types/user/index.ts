import { User } from "@prisma/client";

export type UserWithoutPassword = Omit<User, "password">;

export type UserNullable = User | null;

export type UserCreatePayload = Pick<User, "username" | "password" | "email">;

export type UserPayload = Partial<Omit<User, "id" | "createdAt">>;