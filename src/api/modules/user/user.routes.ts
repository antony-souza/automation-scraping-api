import { Router } from "express";
import { UserApiController } from "./user.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { userSchema } from "./user.schema";

const controller = new UserApiController();

export const userApiRoutes = Router();

userApiRoutes.post("/",
    validationBodyMiddleware(userSchema),
    controller.create
);