import { Request, Response } from "express";
import { genericResponseControllerUtil } from "../utils/generic-response";
import { AlertUpdateVirtualAssistantUseCase } from "./usecase/alert-update-bot.usecase";

export class BotController {

    async sendMessageUpdateBot(req: Request, res: Response) {
        const service = new AlertUpdateVirtualAssistantUseCase();
        const data = await service.handler();
        genericResponseControllerUtil(data, res);
    }
}