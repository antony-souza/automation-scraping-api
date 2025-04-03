import { Router } from "express";
import { needKeyApiHeadersMiddleware } from "./middleware/key-headers.middleware";
import { authApiRoutes } from "./api/modules/auth/auth.routes";
import { messageRoutes } from "./api/modules/messages/message.routes";
import { modalityRoutes } from "./api/modules/modality/modality.routes";
import { userRoutes } from "./api/modules/user/user.routes";
/* import { needAuthWithTokenMiddleware } from "./middleware/auth.middleware"; */

export const routes = Router();

routes.use(needKeyApiHeadersMiddleware)
routes.use("/auth", authApiRoutes)

/* routes.use(needAuthWithTokenMiddleware) */
routes.use("/user", userRoutes)
routes.use("/whatsapp", messageRoutes)
routes.use("/modality", modalityRoutes) 