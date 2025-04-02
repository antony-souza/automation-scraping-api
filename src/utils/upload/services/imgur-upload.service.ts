import axios from 'axios';
import FormData from 'form-data';
import { environment } from '@src/enviroment';
import { logger } from 'io-logger';
import { IUploadFactoryServiceType } from '../upload-factory-type';

export class ImgurUploadService implements IUploadFactoryServiceType {
  private clientId: string = environment.imgurClientId || '';
  private clientSecret: string = environment.imgurClientSecret || '';
  private accessToken: string = environment.imgurAccessToken || '';
  private refreshToken: string = environment.imgurRefreshToken || '';
  private albumId: string = environment.imgurAlbumId || '';

  private async refreshAccessToken(): Promise<void> {
    logger.debug('Refreshing Imgur Access Token...');

    const formData = new URLSearchParams();
    formData.append('refresh_token', this.refreshToken);
    formData.append('client_id', this.clientId);
    formData.append('client_secret', this.clientSecret);
    formData.append('grant_type', 'refresh_token');

    try {
      const response = await axios.post(
        'https://api.imgur.com/oauth2/token',
        formData.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      if (response.status === 200) {
        this.accessToken = response.data.access_token;
        logger.debug('Access token refreshed successfully.');
      } else {
        logger.error(`Failed to refresh token: ${response.data.error}`);
      }
    } catch (error: any) {
      logger.error(`Error refreshing token: ${error.message}`);
    }
  }

  async upload(file: Buffer): Promise<string | undefined> {
    if (!file) {
      logger.debug('No buffer provided for upload.');
      return undefined;
    }

    const formData = new FormData();
    formData.append('image', file, { filename: 'foto.jpg' });
    formData.append('type', 'file');
    formData.append('title', 'Avatar');
    formData.append('description', 'Uploaded via API');
    formData.append('album', this.albumId);
    formData.append('privacy', 'hidden');

    try {
      logger.debug('Uploading image to Imgur...');

      const response = await axios.post(
        'https://api.imgur.com/3/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            ...formData.getHeaders(),
          },
        },
      );

      if (
        response.status === 403 &&
        response.data.data.error === 'The access token provided is invalid'
      ) {
        logger.alert('Access token invalid. Refreshing token...');
        await this.refreshAccessToken();
        return this.upload(file);
      }

      if (response.status !== 200) {
        logger.debug(`Failed to upload image: ${response.data.error}`);
        return undefined;
      }
      return response.data.data.link;
    } catch (error: any) {
      logger.error('Failed to upload image to Imgur: ' + error.message);
      return undefined;
    }
  }
}
