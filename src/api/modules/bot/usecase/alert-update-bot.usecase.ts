import { userModel } from "@src/models/user.model";
import { SendMessageForQueueWhatsGeneric } from "@src/services/whatsapp/send-message-generic.service";
import { messageUpdate } from "../messages/update-bot-all-users";
import { ICaseContract } from "@src/api/contracts/case.contract";


export class AlertUpdateVirtualAssistantUseCase implements ICaseContract {
    async handler() {
        const whatsAppService = new SendMessageForQueueWhatsGeneric();

        const usersClients = await userModel.find({
            services: {
                $in: ["check_payment_studeo"]
            },
        })

        if(!usersClients || usersClients.length === 0) {
            return {
                message: "Oops!",
                errors: ["Nenhum usuário encontrado com o serviço de verificação de pagamentos do Studeo."]
            }
        }

        for (const user of usersClients) {
            
            await whatsAppService.handler(user.phone, messageUpdate(user.name));
        }

        return {
            message: "Mensagem enviada para a fila de envio do WhatsApp.",
            errors: []
        }
    }


}