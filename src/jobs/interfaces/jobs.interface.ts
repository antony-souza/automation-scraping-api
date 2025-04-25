export interface IJobs {
    jobName: string;
    handler: () => void | Promise<void>;
  }
  