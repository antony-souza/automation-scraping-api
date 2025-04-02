export interface IRabbitMqQueue {
    queueName: QueueName;
    handler: (data: any) => void | Promise<void>;
  }
  
  export type QueueName = 'avatar' | "send-code-email"