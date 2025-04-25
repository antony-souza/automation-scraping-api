import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface IUser extends IModel {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string
}

export const userModel = model<IUser>("user", new Schema({
  ...modelKeysDefault,
  avatar: {
    type: String,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    ref: "role"
  },
}, modelConfigDefault));