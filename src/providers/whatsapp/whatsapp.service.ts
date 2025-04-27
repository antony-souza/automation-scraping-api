import { Message } from "@src/api/_types/message.type";
import { WhatsAppProvider } from "./whatsapp.provider";
import { FormatPhoneWhatsApp } from "@src/utils/format-phone";

export class WhatsAppService {
    async handler(data: Message) {
        const provider = WhatsAppProvider.Instance;
        if (!provider) {
            return;
        }

        const { client } = provider.getConfig();
        const phone = FormatPhoneWhatsApp.handler(data.phone);

        await client.sendMessage(`${phone}`, data.message);
    }

}
