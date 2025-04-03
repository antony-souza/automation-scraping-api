import { IProvider } from "./provider.interface";
import { RabbitmqProvider } from "./rabbitmq/rabbitmq.provider";
import { WhatsAppProvider } from "./whatsapp/whatsapp.provider";


const providerList: IProvider[] = [
	new RabbitmqProvider(),
  new WhatsAppProvider()
];

export class ProviderInit {
    static async handler() {
      for (const provider of providerList) {
        await provider.startProvider();
      }
    }
}