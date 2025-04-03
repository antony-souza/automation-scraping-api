import { Router } from "express";
import { ModalityController } from "./modality.controller";
import { validationBodyMiddleware } from "@src/middleware/validate-body.middleware";
import { modalitySchema } from "./modality.schema";

export const controller = new ModalityController();

export const modalityRoutes = Router();

modalityRoutes.post("/creating-modality",
    validationBodyMiddleware(modalitySchema),
    controller.creatingModality
);
