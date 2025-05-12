import { ICaseContract } from "@src/api/contracts/case.contract";
import { environment } from "@src/environment";
import { groupModel } from "@src/models/group.model";
import { SendMessageForQueueWhatsGeneric } from "@src/services/whatsapp/send-message-generic.service";
import { SendMessageForGroupQueueWhatsGeneric } from "@src/services/whatsapp/send-message-group-generic.service copy";
import { logger } from "@src/utils/logger.utils";
import axios from "axios";

interface ITeam {
    abbreviation: string;
    full_name: string;
    name: string;
}

interface IGame {
    home_team: ITeam;
    visitor_team: ITeam;
    datetime: string;
}

interface IResponseNba {
    data: IGame[];
}

export class GetAllGamesNbaWhatsAppUseCase implements ICaseContract {
    async handler() {

        const whatsappService = new SendMessageForGroupQueueWhatsGeneric();

        const today = new Date().toISOString().split("T")[0];

        const response = await axios.get<IResponseNba>(
            `${environment.nbaApiUrl}?dates[]=${today}`,
            {
                headers: {
                    "Authorization": `${environment.nbaApiKey}`
                },
            }
        );

        const games = response.data.data;

        const gameMessageFormatted = games.map((game) => {
            const gameHour = new Date(game.datetime).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
            });
            return {
                message: `🏀 ${game.visitor_team.name}(${game.visitor_team.abbreviation}) vs ${game.home_team.name}(${game.home_team.abbreviation} ) - 🕒 ${gameHour}`,
            }
        });

        const todayFormatted = new Date().toLocaleDateString("pt-BR");

        const gameMessage = `*Jogos da NBA - ${todayFormatted}:*\n\n` + gameMessageFormatted.map((game) => game.message).join("\n");

        const groups = await groupModel.find({
            services: { $in: [environment.nbaFindDbService] }
        })

        if (!groups.length) {
            logger.error("Nenhum grupo encontrado com o servico NBA!");

            return {
                message: "Oops!",
                errors: ["Nenhum grupo encontrado com o servico NBA!"],
            }
        }

        for (const group of groups) {
            await whatsappService.handler(
                group.whatsappGroupId,
                gameMessage,
            );
        }

        return {
            message: "Sucesso! Jogos da NBA enviados para os grupos.",
            data: gameMessage,
        }
    }
}
