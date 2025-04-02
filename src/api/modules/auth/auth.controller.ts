import { Request, Response } from "express";
import { genericResponseControllerUtil } from "../utils/generic-response";
import { AuthUseCase } from "./usecase/auth.case";

export class AuthApiController {
  async login(req: Request, res: Response) {
    const service = new AuthUseCase();
    const data = await service.handler(req.body);
    genericResponseControllerUtil(data, res);
  }
}