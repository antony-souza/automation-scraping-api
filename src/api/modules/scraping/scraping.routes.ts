import { Router } from "express";
import { ScrapingController } from "./scraping.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { fpeScmea } from "./schemas/fpe.schema";

const controller = new ScrapingController();

export const scrapingRoutes = Router();

scrapingRoutes.post("/fpe/auth",
    validationBodyMiddleware(fpeScmea),
    controller.authFpe
);
