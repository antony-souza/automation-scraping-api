import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface IRole extends IModel {
    name: string;
    tag: string;
}

export const roleModel = model<IRole>("role", new Schema({
    ...modelKeysDefault,
    name: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
}
    , modelConfigDefault
));