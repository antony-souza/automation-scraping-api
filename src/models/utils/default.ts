import {randomUUID} from "node:crypto"

export const modelConfig = {
    timestamps: true,
    versionKey: false,
  }
  
  export const modelKeysDefault = {
    _id:{
        type: String,
        require: false,
        default: () => randomUUID
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true,
    },
  }
  
  export interface IModel {
    _id?: string;
    enabled?: boolean;
  }