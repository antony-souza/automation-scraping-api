import { logger } from "io-logger";
import { QueueName } from "./rabbitmq.interface.queues";
import { RabbitmqProvider } from "./rabbitmq.provider";

export class RabbitmqService {
	async sendToQueue(queue: QueueName, data: any) {
		const provider = RabbitmqProvider.Instance;
		if (!provider) {
			return;
		}

		const { channel } = provider.getConfig();
		channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });
		logger.info(`${queue} received new data`);
	}
}