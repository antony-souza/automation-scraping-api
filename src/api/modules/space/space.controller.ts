import { Request, Response } from "express";
import { CreateSpaceUseCase } from "./usecase/create-space.usecase";
import { genericResponseControllerUtil } from "../utils/generic-response";

export class SpaceController {
    async createSpace(req: Request, res: Response) {
        const service = new CreateSpaceUseCase();
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    }
}