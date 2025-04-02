import { environment } from '@src/enviroment';
import { ImgurUploadService } from './services/imgur-upload.service';

type UPLOAD_SERVICE_TYPE = 'IMGUR';

export default class UploadFileFactoryService {
  private readonly UPLOAD_SERVICE_TYPE: UPLOAD_SERVICE_TYPE;
  private readonly imgurUploadService: ImgurUploadService;

  constructor() {
    this.UPLOAD_SERVICE_TYPE =
      environment.uploadServiceType as UPLOAD_SERVICE_TYPE;

    this.imgurUploadService = new ImgurUploadService();
  }

  async upload(file: Buffer): Promise<string | undefined> {
    if (this.UPLOAD_SERVICE_TYPE === 'IMGUR') {
      return await this.imgurUploadService.upload(file);
    }

    return undefined;
  }
}
