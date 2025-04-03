import { Router } from "express";
import { SpaceController } from "./space.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { spaceScema } from "./space.schema";

export const controller = new SpaceController();

export const spaceRoutes = Router();

spaceRoutes.post("/create",
    validationBodyMiddleware(spaceScema),
    controller.createSpace
);