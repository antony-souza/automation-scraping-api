import { Router } from "express";
import { UserApiController } from "./user.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { userSchema } from "./user.schema";
import { multerUpload } from "@src/api/core/multer.config";

const controller = new UserApiController();

export const userApiRoutes = Router();

userApiRoutes.post("/",
    validationBodyMiddleware(userSchema),
    controller.create
);

userApiRoutes.post("/send-avatar",
    multerUpload.single("avatar"),
    controller.sendAvatarForQueue
);