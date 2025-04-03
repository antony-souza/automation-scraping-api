import * as amqp from 'amqplib';
import { IProvider } from '../provider.interface';
import { environment } from '@src/enviroment';
import { logger } from '@src/utils/logger.utils';
import { queueList } from './queue/queue';

export class RabbitmqProvider implements IProvider {
  public static Instance: RabbitmqProvider;

  providerName = 'rabbitmq-bomdia';
  private connection!: amqp.ChannelModel;
  private channel!: amqp.Channel;

  constructor() {
    if (!RabbitmqProvider.Instance) {
      RabbitmqProvider.Instance = this;
    }
  }

  async startProvider(): Promise<void> {
    if (!environment.enabledRabbitmq) {
      logger.debug('RabbitMQ is disabled');
      return;
    }
    try {
      this.connection = await amqp.connect({
        vhost: environment.rabbitmqVhost,
        port: environment.rabbitmqPort,
        username: environment.rabbitmqUser,
        password: environment.rabbitmqPassword,
        hostname: environment.rabbitmqHost,
      });
      this.channel = await this.connection.createChannel();
      logger.info(
        `RabbitMQ connected in @${environment.rabbitmqHost}:${environment.rabbitmqPort}`
      );
      logger.info(
        `RabbitMQ Management: http://${environment.rabbitmqHost}:${environment.rabbitmqManagementPort}`,
      );
      await this.registerAllQueues();
    } catch (error: any) {
      logger.error(`RabbitMQ connection:${error.message}`);
    }
  }

  getConfig() {
    return {
      connection: this.connection,
      channel: this.channel,
    };
  }

  private async registerAllQueues() {
    await Promise.all(
      queueList.map(async (queue) => {
        await this.channel.assertQueue(queue.queueName, { durable: true });
        logger.debug(
          `RabbitMQ queue: ${queue.queueName} created`,
        );
        if (environment.enabledRabbitQueueConsume) {
          await this.channel.consume(queue.queueName, (msg) => {
            try {
              const messageContent = msg!.content.toString();
              const data = JSON.parse(messageContent);
              queue.handler(data);
              this.channel.ack(msg!);
            } catch {
              this.channel.nack(msg!, false, true);
            }
          });
        }
      }),
    );
  }
}
