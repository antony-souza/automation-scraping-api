import { Router } from "express";
import { BotController } from "./bot.controller";

const controller = new BotController();

export const botRoutes = Router();

botRoutes.get("/new-feature", controller.sendMessageUpdateBot);


