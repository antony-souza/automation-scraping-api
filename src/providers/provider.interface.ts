export interface IProvider {
    providerName: string;
    startProvider: () => void | Promise<void>;
  }
  