import { Expose } from 'class-transformer';

export class CategoryModel {
  @Expose()
  id: string;
  @Expose()
  categoryCode: string;
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
