import { environment } from "@src/environment";
import { WhatsAppProvider } from "@src/providers/whatsapp/whatsapp.provider";
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

export class AllGamesNbaCommandService {
    async handler() {
        const provider = WhatsAppProvider.Instance;
        if (!provider) return;

        const { client } = provider.getConfig();

        client.on("message", async (message) => {
            const messageBody = message.body.toLowerCase().trim();

            if (messageBody === "/nba") {
                await client.sendMessage(message.from, "🔎 Buscando os jogos da NBA para hoje...");
                console.log(message.from)
                const today = new Date().toISOString().split("T")[0];

                try {
                    const response = await axios.get<IResponseNba>(
                        `${environment.nbaApiUrl}?dates[]=${today}`,
                        {
                            headers: {
                                "Authorization": `${environment.nbaApiKey}`
                            },
                        }
                    );

                    const games = response.data.data;

                    if (!games.length) {
                        await client.sendMessage(message.from, "🏀 Nenhum jogo da NBA encontrado para hoje.");
                        return;
                    }

                    const gameMessageFormatted = games.map((game) => {
                        const gameHour = new Date(game.datetime).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit"
                        });
                        return `🏀 ${game.visitor_team.name}(${game.visitor_team.abbreviation}) vs ${game.home_team.name}(${game.home_team.abbreviation} ) - 🕒 ${gameHour}`;
                    });

                    const todayFormatted = new Date().toLocaleDateString("pt-BR");

                    const gameMessage = `*Jogos da NBA - ${todayFormatted}:*\n\n` + gameMessageFormatted.join("\n");
                    await client.sendMessage(message.from, gameMessage);
                } catch (error) {
                    logger.error("Erro ao buscar jogos da NBA:", error);
                    await client.sendMessage(message.from, "❌ Ocorreu um erro ao buscar os jogos da NBA.");
                }
            }
        });
    }
}
