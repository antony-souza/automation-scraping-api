import { Request, Response } from "express";
import { genericResponseControllerUtil } from "../utils/generic-response";
import { CreateUserUseCase } from "./usecase/create-user.usecase";
import { SendAvatarForQueueUseCase } from "./usecase/send-avatar-queue.usecase";

export class UserApiController {
  async create(req: Request, res: Response) {
    const service = new CreateUserUseCase()
    const data = await service.handler(req.body);
    genericResponseControllerUtil(data, res);
  }

  async sendAvatarForQueue(req: Request, res: Response) {
    const service = new SendAvatarForQueueUseCase()
    const data = await service.handler(res.locals["userData"]._id, req.body.avatar);
    genericResponseControllerUtil(data, res);
  }
}