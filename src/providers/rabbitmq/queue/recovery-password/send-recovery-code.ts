import { NodemailerProvider } from "@src/providers/nodemailer/nodemailer.provider";
import { IRabbitMqQueue, QueueName } from "@src/providers/rabbitmq/rabbitmq.interface.queues";

interface IRecoveryPasswordSendCodeEmail {
    email: string;
    code: string;
    html: string;
}

export class SendRecoveryCodeToEmailQueue implements IRabbitMqQueue {
    queueName: QueueName = "send-code-email";

    async handler(data: IRecoveryPasswordSendCodeEmail) {
        /* const { email, code, html } = data;

        await codeEmailModule.create({
            email,
            uniqueCode: code,
            code,
        });

        const nodemailerProvider = new NodemailerProvider();
        const subject = "Código de Validação";
        await nodemailerProvider.sendEmail(email, subject, html) */
    }
}