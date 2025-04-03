import { ICaseContract } from "@src/api/contracts/case.contract";
import { IModality, modalityModel } from "@src/models/modality.model";

type Modality = IModality

export class CreateModalityUseCase implements ICaseContract {
    async handler(data: Modality) {
        const checkModality = await modalityModel.findOne({name: data.name})

        if (checkModality) {
            return {
                message: "Oops!",
                errors: ["Modality already exists!"]
            }
        }

        const creatingModality = await modalityModel.create(data)
        if (!creatingModality) {
            return {
                message: "Oops!",
                errors: ["Error creating modality"]
            }
        }

        return {
            message: "Modality created successfully",
            errors: []
        }
    }
}