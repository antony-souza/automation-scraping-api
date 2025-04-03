import { ICaseContract } from "@src/api/contracts/case.contract";
import { ISpace, spaceModel } from "@src/models/space.model";

type Space = ISpace;

export class CreateSpaceUseCase implements ICaseContract{
    async handler(data: Space){
        const checkSpace = await spaceModel.findOne({name: data.name})
        if(checkSpace){
            return {
                message: "Oops!",
                errors:["Space already exists"]
            }
        }

        const creatingSpace = await spaceModel.create(data)
        
        if(!creatingSpace){
            return {
                message: "Oops!",
                errors:["Error creating space"]
            }
        }

        return {
            message: "Space created successfully",
            errors:[]
        }
    }
}