import { Message } from "@src/api/_types/message.type";
import { WhatsAppProvider } from "./whatsapp.provider";

export class WhatsAppService {
    async handler(data: Message) {
        const provider = WhatsAppProvider.Instance;
        if (!provider) {
            return;
        }

        const { client } = provider.getConfig();
        const phone = this.formatPhone(data.phone);

        const sendMessage = await client.sendMessage(`${phone}@c.us`, data.message);
        console.log("Mensagem enviada com sucesso", sendMessage);
    }

    private formatPhone(phone: string): string {
        const cleaned = phone.replace(/\D/g, '');
        const withDdi = cleaned.startsWith("55") ? cleaned : `55${cleaned}`;
        return withDdi;
    }
}
