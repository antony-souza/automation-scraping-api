import { ICaseContract } from "@src/api/contracts/case.contract";
import { groupModel, IGroup } from "@src/models/group.model";

export type Group = IGroup;

export class CreateGroupUseCase implements ICaseContract {
    async handler(data: Group) {

        if(!data){
            return {
                message: "Oops!",
                errors: ["Nenhum dado foi enviado para criar o grupo!"]
            }
        }

        const groupExists = await groupModel.findOne({
            whatsappGroupId: data.whatsappGroupId,
        });

        if (groupExists) {
            return {
                message: "Grupo já existe!",
                errors: ["Grupo já existe com esse ID de WhatsApp!"],
            }
        }

        const group = await groupModel.create({
            whatsappGroupId: data.whatsappGroupId,
            name: data.name,
            services: data.services,
        });

        if (!group) {
            return {
                message: "Oops!",
                errors: ["Erro ao criar o grupo!"]
            }
        }

        return {
            message: "Grupo criado com sucesso!",
        }
    }
}