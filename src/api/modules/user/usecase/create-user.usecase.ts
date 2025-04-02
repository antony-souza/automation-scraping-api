import { ApiResponse } from "@src/api/_types/api-response.type";
import { ICaseContract } from "@src/api/contracts/case.contract";
import { IUser } from "@src/models/user.model";

type User = IUser

export class CreateUserUseCase implements ICaseContract {
    async handler(data: User){

        return {
            message: "",
            data: "",
            errors: []
        }
    }
}
