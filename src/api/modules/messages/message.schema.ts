import { ICaseContract } from "@src/api/contracts/case.contract";
import { RabbitmqService } from "@src/providers/rabbitmq/rabbitmq.service";

type Message = {
    phone: string;
    message: string;
}

export class SendMessageForQueueUseCase implements ICaseContract{
    async handler(data: Message) {
        const rabbitmqService = new RabbitmqService()
        await rabbitmqService.sendToQueue("whatsapp-messages", {
            phone: data.phone,
            message:data.message
        })

        return {
            message: "Mensagem enviada para a fila com sucesso",
            errors: []
        }
    }
}