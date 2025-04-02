import { userModel } from "@src/models/user.model";
import { logger } from "io-logger";
import { IRabbitMqQueue, QueueName } from "../../rabbitmq.interface.queues";
import UploadFileFactoryService from "@src/utils/upload/upload-file.service";

interface IUserApiUploadAvatarUseCaseResponse {
	userId: string;
	buffer: {
		type: Buffer;
		data: number[];
	}
}
export class UserAvatarUploadQueue implements IRabbitMqQueue {
	queueName: QueueName = "avatar";

	async handler(data: IUserApiUploadAvatarUseCaseResponse): Promise<void> {

		const { userId, buffer } = data;

		if (!buffer || !buffer.data) {
			logger.error("No buffer provided for upload.");
			return;
		}

		const imageBuffer = Buffer.from(buffer.data);

		const serviceUpload = new UploadFileFactoryService()
		const url = await serviceUpload.upload(imageBuffer);

		await userModel.updateOne({ _id: userId }, { $set: { avatar: url } });
	}
}