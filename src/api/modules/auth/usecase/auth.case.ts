import { userModel } from "@src/models/user.model";
import { ApiResponse } from "@src/api/_types/api-response.type";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import { environment } from "@src/enviroment";
import { ICaseContract } from "@src/api/contracts/case.contract";

type AuthData = {
  email: string;
  password: string;
}

export class AuthUseCase implements ICaseContract {
  async handler(data: AuthData) {
    const findUser = await userModel.findOne({
      email: data.email,
      active: true
    }).exec();

    if (!findUser) {
      return { message: "Oops!", errors: ["Email ou senha errada!"] };
    }

    const comparePassword = await bcrypt.compare(data.password, findUser.password);

    if (!comparePassword) {
      return { message: "Oops!", errors: ["Email ou senha errada!"] };
    }

    const token = jwt.sign({ email: findUser.email }, environment.tokenSecret, {
      expiresIn: "18h"
    });

    return { message: "Login success", data: { token: token }, errors: [], }
  }
}