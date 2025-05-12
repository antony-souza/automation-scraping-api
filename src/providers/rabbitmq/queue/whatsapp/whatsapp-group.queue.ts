import { IRabbitMqQueue, QueueName } from "../../rabbitmq.interface.queues";
import { Message } from "@src/api/_types/message.type";
import { WhatsAppNotFormatedNumberService } from "@src/providers/whatsapp/whatsapp-not-formated-number.service";

export class SendMessageForGroupWithWhatsAppQueue implements IRabbitMqQueue {
    queueName: QueueName = "whatsapp-messages-group";

    async handler(data: Message) {

        const { phone, message } = data
        const service = new WhatsAppNotFormatedNumberService();
        await service.handler({ phone, message })
    }
}