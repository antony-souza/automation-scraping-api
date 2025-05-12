import { Router } from "express";
import { GroupController } from "./group.controller";

const controller = new GroupController();
export const groupRoutes = Router();

groupRoutes.post("/create", controller.createGroup);