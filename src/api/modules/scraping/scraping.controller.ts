import { Request, Response } from "express";
import { AuthFpeUseCase } from "./usecase/AuthFpeUseCase";
import { genericResponseControllerUtil } from "../utils/generic-response";

export class ScrapingController {
    async authFpe(req: Request, res: Response) {
        const service = new AuthFpeUseCase();
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    }
}