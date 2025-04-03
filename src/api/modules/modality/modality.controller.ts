import { Request, Response } from 'express';
import { CreateModalityUseCase } from './usecase/create-modality.usecase';
import { genericResponseControllerUtil } from '../utils/generic-response';

export class ModalityController {
    async creatingModality(req: Request, res: Response) {
        const service = new CreateModalityUseCase()
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    }
}