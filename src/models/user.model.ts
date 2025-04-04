import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export interface IUser extends IModel {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  hour: string;
  turn: string;
  space: string;
  modality: string;
  role: string
}

export const userModel = model<IUser>("user", new Schema({
  ...modelKeysDefault,
  avatar: {
    type: String,
    required: false,
    default: 'https://i.imgur.com/zh99mGz.png',
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
  hour: {
    type: String,
    required: true,
  },
  turn: {
    type: String,
    required: true,
  },
  space: {
    type: String,
    required: true,
    ref: "space"
  },
  modality: {
    type: String,
    required: true,
    ref: "modality"
  },
  role: {
    type: String,
    required: true,
    ref: "role"
  },
}, modelConfigDefault));