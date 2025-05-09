import express from "express";
import mongoose from "mongoose";
import { environment } from "./environment";
import { ProvidersInit } from "./providers/provider";
import { routes } from "./routes";
import cors from "cors";
import { logger } from "./utils/logger.utils";
import { JobsInit } from "./jobs/jobs";
import { InitServices } from "./services/init-services.service";

async function bootstrap() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(routes);

    await mongoose.connect(environment.mongoUrl).then(() => {
        logger.info("Connected to DB");
    });

    await ProvidersInit.handler()
    await InitServices.handler();
    await JobsInit.handler();

    process.on("uncaughtException", (err) => {
        logger.error(err);
    });

    process.on("unhandledRejection", (reason: any, promise) => {
        logger.error(reason);
    });

    app.listen(environment.port, () => {
        logger.info(`Server running on port: ${environment.port}`);
    });
};

bootstrap();
