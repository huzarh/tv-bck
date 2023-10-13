import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(config: ConfigService) {
    cloudinary.v2.config({
      secure: true,
      cloud_name: 'dlsutojvh',
      api_key: '551264487663434',
      api_secret: '9mmNvYRRjIC3-g6kvBXvCsjxGk8',
    });
  }

  uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        })
        .end(file.buffer);
    });
  }

  deleteImage(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }
}
