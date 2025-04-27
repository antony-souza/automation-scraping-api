import { logger } from "@src/utils/logger.utils";
import { IService } from "./interface/service.interface";
import { IterationWhatsAppService } from "./whatsapp/commands/check-payments-with-username.service";

const services: IService[] = [
    new IterationWhatsAppService()
]

export class InitServices {
    static async handler() {
        for (const service of services) {
            await service.handler();
        }
        logger.info("Services initialized");
    }
}