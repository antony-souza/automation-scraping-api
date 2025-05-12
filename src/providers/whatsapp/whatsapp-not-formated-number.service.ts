import { Message } from "@src/api/_types/message.type";
import { WhatsAppProvider } from "./whatsapp.provider";

export class WhatsAppNotFormatedNumberService {
    async handler(data: Message) {
        const provider = WhatsAppProvider.Instance;
        if (!provider) {
            return;
        }

        const { client } = provider.getConfig();

        await client.sendMessage(data.phone, data.message);
    }

}
