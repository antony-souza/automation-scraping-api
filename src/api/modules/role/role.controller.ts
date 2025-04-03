import { Request, Response } from 'express';
import { CreateRoleUseCase } from './usecase/create-role.usecase';
import { genericResponseControllerUtil } from '../utils/generic-response';
export class RoleController {
    
    async createRole(req: Request, res: Response) {
        const service = new CreateRoleUseCase();
        const data = await service.handler(req.body);
        genericResponseControllerUtil(data, res);
    }
}