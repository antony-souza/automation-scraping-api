import { Router } from "express";
import { needKeyApiHeadersMiddleware } from "./middleware/key-headers.middleware";
import { authApiRoutes } from "./api/modules/auth/auth.routes";
/* import { needAuthWithTokenMiddleware } from "./middleware/auth.middleware"; */

export const routes = Router();

routes.use(needKeyApiHeadersMiddleware)
routes.post("/auth", authApiRoutes)

/* routes.use(needAuthWithTokenMiddleware) */
