import { Expose } from 'class-transformer';

export class BrandModel {
  @Expose()
  id: string;
  @Expose()
  brandCode: string;
  @Expose()
  name: string;
  @Expose()
  thumbnailLink: string;
  @Expose()
  created: Date;
  @Expose()
  updated: Date[];

  update(data: Partial<this>) {
    console.log(data);
  }
}
