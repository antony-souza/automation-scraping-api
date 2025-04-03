import { genericResponseControllerUtil } from "../utils/generic-response";
import { SendMessageForQueueUseCase } from "./message.schema";
import { Request, Response } from "express";

export class MessageController {
    async sendMessageForQueue(req: Request, res: Response) {
        const service = new SendMessageForQueueUseCase()
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    }
}