import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface IUser extends IModel {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  usernameStudeo: string;
  passwordStudeo: string;
  services: string[]
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
  usernameStudeo: {
    type: String,
    required: true,
  },
  passwordStudeo: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
    default: [],
  },
}, modelConfigDefault));