import { WhatsAppFormatedNumberService } from "@src/providers/whatsapp/whatsapp-formated-number.service";
import { IRabbitMqQueue, QueueName } from "../../rabbitmq.interface.queues";
import { Message } from "@src/api/_types/message.type";

export class SendMessageWithWhatsAppQueue implements IRabbitMqQueue {
    queueName: QueueName = "whatsapp-messages";
    
    async handler(data: Message) {

        const {phone, message} = data
        const service = new WhatsAppFormatedNumberService()
        await service.handler({ phone, message })
        
    }
}