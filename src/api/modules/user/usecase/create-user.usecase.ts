import { ICaseContract } from "@src/api/contracts/case.contract";
import { environment } from "@src/enviroment";
import { IUser, userModel } from "@src/models/user.model";
import * as bcrypt from "bcrypt"

type User = IUser

export class CreateUserUseCase implements ICaseContract {
    async handler(data: User){
        const checkUser = await userModel.findOne({email: data.email}).exec();

        if(checkUser){
            return {
                message: "Oops!",
                errors: ["Email já cadastrado!"]
            }
        }

        const createUser = await userModel.create({
            ...data,
            password: await bcrypt.hash(data.password, environment.bcryptSalt),
        })

        if(!createUser){
            return {
                message: "Oops!",
                errors: ["Erro ao cadastrar usuário!"]
            }
        }

        return {
            message: "Usuario cadastrado com sucesso!",
            data: {
                _id: createUser._id,
            },
            errors: []
        }
    }
}
