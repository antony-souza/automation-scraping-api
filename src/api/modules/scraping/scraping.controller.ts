import { Request, Response } from "express";
import { genericResponseControllerUtil } from "../utils/generic-response";
import { CheckPaymentsStudeoUseCase } from "./usecase/check-payments-studeo.usecase";

export class ScrapingController {
    /* async authFpe(req: Request, res: Response) {
        const service = new CheckPaymentsStudeoUseCase();
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    } */
}