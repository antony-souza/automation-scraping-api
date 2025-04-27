import { Router } from "express";
import { needKeyApiHeadersMiddleware } from "./middleware/key-headers.middleware";
import { authApiRoutes } from "./api/modules/auth/auth.routes";
import { userRoutes } from "./api/modules/user/user.routes";
import { roleRoutes } from "./api/modules/role/role.routes";
import { botRoutes } from "./api/modules/bot/bot.routes";

export const routes = Router();

routes.use(needKeyApiHeadersMiddleware);
routes.use("/auth", authApiRoutes);

/* routes.use(needAuthWithTokenMiddleware) */
routes.use("/user", userRoutes);
routes.use("/role", roleRoutes);
routes.use("/bot", botRoutes);