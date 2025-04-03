import { Client, LocalAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import { IProvider } from "../provider.interface";
import { logger } from "@src/utils/logger.utils";
import { environment } from "@src/environment";

export class WhatsAppProvider implements IProvider {
    public static Instance: WhatsAppProvider;
    providerName = "whatsapp-bot";
    private client!: Client;

    constructor() {
        if (!WhatsAppProvider.Instance) {
            WhatsAppProvider.Instance = this;
        }
    }

    startProvider() {
        if(!environment.whatsappEnabled){
            logger.info("WhatsApp provider is disabled.");
            return;
        }

        this.client = new Client({
            authStrategy: new LocalAuth(),
        });
        this.client.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
            logger.info("QR code generated");
        });
        this.client.on("authenticated", () => logger.info("WhatsApp autenticado com sucesso!"));
        this.client.on("ready", () => logger.info("WhatsApp conectado!"));
        this.client.on("disconnected", (reason) => {
            logger.warn(`Whatsapp desconectado: ${reason}`);
            this.client.initialize();
        });
        this.client.initialize();
    }

    getConfig() {
        return {
            client: this.client,
        };
    }


}
