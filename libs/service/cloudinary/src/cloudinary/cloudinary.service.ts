import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUpload } from '@store-monorepo/utility';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { CloudinaryResponse } from './cloudinary.response';

@Injectable()
export class CloudinaryService {
  uploadFile(file: FileUpload): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          if (!result) throw new InternalServerErrorException();
          resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  deleteFile(public_id: string): Promise<any> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
