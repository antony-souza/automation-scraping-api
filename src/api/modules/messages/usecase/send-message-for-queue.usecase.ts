import { ICaseContract } from "@src/api/contracts/case.contract";
import { IMessage } from "@src/models/message.model";
import { RabbitmqService } from "@src/providers/rabbitmq/rabbitmq.service";
import { messageTemplateMensalidade } from "./message-template-mensalidade";

type Message = IMessage

export class SendMessageForQueueUseCase implements ICaseContract {
    async handler(data: Message) {
        const rabbitmqService = new RabbitmqService()
        await rabbitmqService.sendToQueue("whatsapp-messages", {
            phone: data.phone,
            message: messageTemplateMensalidade
        })

        return {
            message: "Mensagem enviada para a fila com sucesso",
            errors: []
        }
    }
}