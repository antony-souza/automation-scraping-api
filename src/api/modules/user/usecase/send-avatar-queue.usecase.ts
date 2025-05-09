import { ICaseContract } from "@src/api/contracts/case.contract";
import { RabbitmqService } from "@src/providers/rabbitmq/rabbitmq.service";

export class SendAvatarForQueueUseCase implements ICaseContract {
    async handler(userId: string, avatar: Express.Multer.File) {
        const rabbitmqService = new RabbitmqService()
        await rabbitmqService.sendToQueue("avatar", {
            userId: userId,
            avatar: avatar
        })

        return {
            message: "Avatar enviado para a fila com sucesso",
            errors: []
        }
    }
}