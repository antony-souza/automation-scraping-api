import { Request, Response } from "express";
import { genericResponseControllerUtil } from "../utils/generic-response";
import { AlertUpdateVirtualAssistantUseCase } from "./usecase/alert-update-bot.usecase";
import { GetAllGamesNbaWhatsAppUseCase } from "./usecase/get-all-games-nba-whatsapp.usecase";

export class BotController {

    async sendMessageUpdateBot(req: Request, res: Response) {
        const service = new AlertUpdateVirtualAssistantUseCase();
        const data = await service.handler();
        genericResponseControllerUtil(data, res);
    }

    async sendNbaGamesToday(req: Request, res: Response) {
        const service = new GetAllGamesNbaWhatsAppUseCase();
        const data = await service.handler();
        genericResponseControllerUtil(data, res);
    }
}