import { Request, Response } from "express";
import { CreateGroupUseCase } from "./usecase/create-group.usecase";
import { genericResponseControllerUtil } from "../utils/generic-response";

export class GroupController {
    async createGroup(req: Request, res: Response) {
        const service = new CreateGroupUseCase();
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    }
}