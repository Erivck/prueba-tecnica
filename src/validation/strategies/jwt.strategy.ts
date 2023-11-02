import { getUserById } from "../../services/user";
import { JWT_SECRET } from "../../config";
import passportJwt, { VerifiedCallback } from "passport-jwt";
import { HttpRequestError, JWTPayload } from "../../types";
import { omitPropertyFromObject } from "../../utils";

export const jwtStrategy = new passportJwt.Strategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: JWT_SECRET,
  },
  async <T extends JWTPayload>(payload: T, done: VerifiedCallback) => {
    try {
      const user = await getUserById(payload.sub);
      if (!user) {
        return done(new HttpRequestError("User not found", 401));
      }
      const userWithoutPassword = omitPropertyFromObject(user, "password");
      return done(null, userWithoutPassword);
    } catch (error) {
      return done(error);
    }
  }
);
