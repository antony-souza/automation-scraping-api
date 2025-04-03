import { ICaseContract } from "@src/api/contracts/case.contract";
import { IRole, roleModel } from "@src/models/role.model";

type Role = IRole;

export class CreateRoleUseCase implements ICaseContract {
    async handler(data: Role) {
        const checkRole = await roleModel.findOne({ name: data.name });

        if (checkRole) {
            return {
                message: "Oops!",
                errors: ["Role already exists!"]
            }
        }
        const creatingRole = await roleModel.create(data);
        
        if (!creatingRole) {
            return {
                message: "Oops!",
                errors: ["Error creating role"]
            }
        }

        return {
            message: "Role created successfully",
            errors: []
        }
    }
}