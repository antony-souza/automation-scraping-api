import { Router } from "express";
import { UserApiController } from "./user.controller";

const controller = new UserApiController();

export const userApiRoutes = Router();

userApiRoutes.post("/", controller.create);