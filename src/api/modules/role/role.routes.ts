import { Router } from "express";
import { RoleController } from "./role.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { roleSchema } from "./role.schema";

export const controller = new RoleController();

export const roleRoutes = Router();

roleRoutes.post("/create",
    validationBodyMiddleware(roleSchema),
    controller.createRole
);