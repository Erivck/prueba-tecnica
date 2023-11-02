import {
  IsString,
  MinLength,
  IsEmail,
  IsStrongPassword,
  IsAlpha,
  IsOptional,
} from "class-validator";
import { Expose } from "class-transformer";
import { ContainsAtLeastOneLetter, IsValidUsername } from "../decorators";
import { User } from "@prisma/client";

export class UserDto implements Omit<User, "id" | "createdAt"> {
  @IsString()
  @IsValidUsername()
  @ContainsAtLeastOneLetter()
  @MinLength(4)
  @IsOptional()
  @Expose()
  username: string;

  @IsEmail()
  @IsOptional()
  @Expose()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsString()
  @IsOptional()
  @Expose()
  password: string;

  @IsAlpha()
  @IsString()
  @IsOptional()
  @Expose()
  firstName: string | null;

  @IsAlpha()
  @IsString()
  @IsOptional()
  @Expose()
  lastName: string | null;
}
