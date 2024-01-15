import { Expose } from 'class-transformer';

export type Images = {
  id: string;
  name: string;
  url: string;
  isMain: boolean;
};

export class ProductModel {
  @Expose()
  id: string;
  @Expose()
  productCode: string;
  @Expose()
  name: string;
  @Expose()
  qty: number;
  @Expose()
  categoryId: string;
  @Expose()
  brandId: string;
  @Expose()
  price: number;
  @Expose()
  description: string;
  @Expose()
  thumbnailLink: Images;
  @Expose()
  images: Images[];
  @Expose()
  created: Date;
  @Expose()
  updated: Date[];

  update(data: Partial<this>) {
    this.qty = data.qty ? data.qty : this.qty;
  }
}
