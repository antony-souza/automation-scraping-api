export interface IUploadFactoryServiceType {
  upload(file: Buffer): Promise<string | undefined>;
}
