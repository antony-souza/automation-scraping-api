import { IRabbitMqQueue } from "../rabbitmq.interface.queues";
import { SendMessageWithWhatsAppQueue } from "./whatsapp/whatsapp.queue";

export const queueList: IRabbitMqQueue[] = [
    new SendMessageWithWhatsAppQueue(),
];