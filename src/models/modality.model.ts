import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "./utils/default";

export interface IModality extends IModel {
    name: string;
    price: number;
}

export const modalityModel = model<IModality>("modality", new Schema({
    ...modelKeysDefault,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
},
    modelConfig
));