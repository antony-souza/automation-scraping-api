
import { logger } from "io-logger";
import { IProvider } from "./provider.interface";
import { RabbitmqProvider } from "./rabbitmq/rabbitmq.provider";


const providerList: IProvider[] = [
	new RabbitmqProvider(),
];

export class ProviderInit {
    static async handler() {
      for (const provider of providerList) {
        await provider.startProvider();
      }
    }
}