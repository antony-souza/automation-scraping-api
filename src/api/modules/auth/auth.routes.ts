import { Router } from "express";
import { AuthApiController } from "./auth.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { authSchema } from "./auth.schema";

const controller = new AuthApiController();

export const authApiRoutes = Router();

authApiRoutes.post("/",
    validationBodyMiddleware(authSchema),
    controller.handler
);