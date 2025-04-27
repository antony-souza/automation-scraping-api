import { MessageMedia } from "whatsapp-web.js";

interface IMessage {
    phone: string;
    message: any;
}

export type Message = IMessage;