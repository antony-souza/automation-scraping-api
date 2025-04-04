import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface ISpace extends IModel {
    name: string;
    address: string;
}

export const spaceModel = model<ISpace>("space", new Schema({
    ...modelKeysDefault,
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
},modelConfigDefault));