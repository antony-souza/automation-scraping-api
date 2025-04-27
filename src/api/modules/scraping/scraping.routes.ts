import { Router } from "express";
import { ScrapingController } from "./scraping.controller";

const controller = new ScrapingController();

export const scrapingRoutes = Router();

/* scrapingRoutes.post("/fpe/sendpdf",controller.sendPdf) */
