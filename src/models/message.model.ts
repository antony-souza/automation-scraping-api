import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface IMessage extends IModel {
    phone: string;
    message: string;
}

export const messageModel = model<IMessage>("message", new Schema({
    ...modelKeysDefault,
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
},modelConfigDefault
));