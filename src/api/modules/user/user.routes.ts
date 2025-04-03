import { Router } from "express";
import { UserApiController } from "./user.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { userSchema } from "./user.schema";
import { multerUpload } from "@src/api/core/multer.config";

const controller = new UserApiController();

export const userRoutes = Router();

userRoutes.post("/",
    validationBodyMiddleware(userSchema),
    controller.create
);

userRoutes.post("/send-avatar",
    multerUpload.single("avatar"),
    controller.sendAvatarForQueue
);