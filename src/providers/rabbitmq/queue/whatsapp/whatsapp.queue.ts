import { WhatsAppService } from "@src/providers/whatsapp/whatsapp.service";
import { IRabbitMqQueue, QueueName } from "../../rabbitmq.interface.queues";
import { Message } from "@src/api/_types/message.type";

export class SendMessageWithWhatsAppQueue implements IRabbitMqQueue {
    queueName: QueueName = "whatsapp-messages";
    
    async handler(data: Message) {

        const {phone, message} = data
        const service = new WhatsAppService()
        await service.handler({ phone, message })
        
    }
}