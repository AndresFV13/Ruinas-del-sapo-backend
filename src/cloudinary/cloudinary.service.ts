// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';

@Injectable()
export class CloudinaryService {
    private storage = new CloudinaryStorage({
    cloudinary: cloudinary,
        params: {
            folder: 'uploads',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        } as any,
    });

  uploadMiddleware() {
    return multer({ storage: this.storage }).single('image');
  }
}
