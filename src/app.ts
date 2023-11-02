import express from "express";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import routes from "./routes";
import { jwtStrategy } from "./validation/strategies";
import { authenticateUser, httpErrorHandler } from "./middlewares";
import { PORT } from "./config";

dotenv.config();

const app = express();

passport.use(jwtStrategy);

app.set("port", PORT);
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", authenticateUser);
app.use(routes());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  return res.status(200).send({ message: "pong" });
});

app.use(httpErrorHandler);

export default app;
