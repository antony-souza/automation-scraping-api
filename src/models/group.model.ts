import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface IGroup extends IModel {
    whatsappGroupId: string;
    name: string;
    services: string[];
}

export const groupModel = model<IGroup>("group", new Schema({
    ...modelKeysDefault,
    whatsappGroupId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        required: true,
        default: [],
    },
}, modelConfigDefault));