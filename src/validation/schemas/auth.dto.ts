import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";
import { Expose } from "class-transformer";
import { ContainsAtLeastOneLetter, IsValidUsername } from "../decorators";
import { User } from "@prisma/client";

export class SignupDto implements Pick<User, "email" | "password" | "username"> {
  @IsString()
  @IsValidUsername()
  @ContainsAtLeastOneLetter()
  @MinLength(4)
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  @IsNotEmpty()
  @Expose()
  password: string;
}

export class LoginDto implements Pick<User, "username" | "password"> {
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}
