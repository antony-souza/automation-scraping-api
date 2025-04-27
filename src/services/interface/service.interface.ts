export interface IService {
    handler: () => void | Promise<void>;
}