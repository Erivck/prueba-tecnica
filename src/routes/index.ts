import userRoutes from "./user";
import authRoutes from "./auth";
import express from "express";

const router = express.Router();

export default (): express.Router => {
  userRoutes(router);
  authRoutes(router);
  return router;
}