import { Router } from "express";
import { MessageController } from "./message.controller";

export const controller = new MessageController()

export const messageRoutes = Router()

messageRoutes.post("/send-message", controller.sendMessageForQueue)