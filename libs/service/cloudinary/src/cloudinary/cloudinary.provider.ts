import { v2 as cloudinary } from 'cloudinary';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@store-monorepo/service/utility';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: environment.CLOUDINARY_CLOUDNAME,
      api_key: environment.CLOUDINARY_APIKEY,
      api_secret: environment.CLOUDINARY_APISECRET,
    });
  },
};