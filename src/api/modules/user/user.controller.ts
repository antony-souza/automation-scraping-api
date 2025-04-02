import { Request, Response } from "express";
import { genericResponseControllerUtil } from "../utils/generic-response";
import { CreateUserUseCase } from "./usecase/create-user.usecase";

export class UserApiController {
  async create(req: Request, res: Response) {
    const service = new CreateUserUseCase()
    const data = await service.handler(req.body);
    genericResponseControllerUtil(data, res);
  }
}