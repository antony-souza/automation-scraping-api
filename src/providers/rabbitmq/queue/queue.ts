import { IRabbitMqQueue } from "../rabbitmq.interface.queues";
import { SendMessageForGroupWithWhatsAppQueue } from "./whatsapp/whatsapp-group.queue";
import { SendMessageWithWhatsAppQueue } from "./whatsapp/whatsapp.queue";

export const queueList: IRabbitMqQueue[] = [
    new SendMessageWithWhatsAppQueue(),
    new SendMessageForGroupWithWhatsAppQueue()
];