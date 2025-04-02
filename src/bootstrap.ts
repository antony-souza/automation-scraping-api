import express from "express";
import mongoose from "mongoose";
import { environment } from "./enviroment";
import { logger } from "io-logger";
import { ProviderInit } from "./providers/provider";
import { routes } from "./routes";
import cors from "cors";

async function bootstrap() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use(routes);

    await mongoose.connect(environment.mongoUrl, {
        dbName: environment.mongoDb
    }).then(() => {
        logger.info("Connected to DB");

    });

    await ProviderInit.handler();

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