import { logger } from "@src/utils/logger.utils";
import { IService } from "./interface/service.interface";
import { AllGamesNbaCommandService } from "./whatsapp/commands/nba/get-all-games-nba.command.service";
import { CheckPaymentsWithUsernameCommandService } from "./whatsapp/commands/studeo/check-payments-with-username.service";

const services: IService[] = [
    new CheckPaymentsWithUsernameCommandService(),
    new AllGamesNbaCommandService()
]

export class InitServices {
    static async handler() {
        for (const service of services) {
            await service.handler();
        }
        logger.info("Services initialized");
    }
}