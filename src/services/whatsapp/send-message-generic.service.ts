import { ICaseContract } from "@src/api/contracts/case.contract";
import { RabbitmqService } from "@src/providers/rabbitmq/rabbitmq.service"

export class SendMessageForQueueWhatsGeneric implements ICaseContract {
    async handler(phone: string, message: string) {
        const rabbitmqService = new RabbitmqService()
        await rabbitmqService.sendToQueue("whatsapp-messages", {
            phone: phone,
            message: message,
        })

        return {
            message: "Mensagem enviada para a fila com sucesso",
            errors: []
        }
    }

}