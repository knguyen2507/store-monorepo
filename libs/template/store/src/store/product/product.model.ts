import { GeneralStatusEnum } from '@store-monorepo/template/shared';

export class ProductModel {
  id: string | null | undefined;
  productCode: string | null | undefined;
  name: string | null | undefined;
  price: number | null | undefined;
  thumbnailLink: string | null | undefined;
  category: string | null | undefined;
  brand: string | null | undefined;
  description: string | null | undefined;
  status: GeneralStatusEnum | null | undefined;
  createdAt: Date | null | undefined;
  createdBy: string | null | undefined;
  updatedAt: Date | null | undefined;
  updatedBy: string | null | undefined;

  // constructor(item: Partial<ProductModel>) {
  //   super();
  //   Object.assign(this, item);
  // }
}

export class ProductDetailModel {
  id: string | null | undefined;
  productCode: string | null | undefined;
  name: string | null | undefined;
  price: number | null | undefined;
  qty: number | null | undefined;
  thumbnailLink: ImageModel | null | undefined;
  category: string | null | undefined;
  brand: string | null | undefined;
  description: string | null | undefined;
  images!: ImageModel[];
  status: GeneralStatusEnum | null | undefined;
  createdAt: Date | null | undefined;
  createdBy: string | null | undefined;
  updatedAt: Date | null | undefined;
  updatedBy: string | null | undefined;
}

export class ImageModel {
  id!: string;
  name!: string;
  url!: string;
  isMain!: boolean;
}

export class ProductModelFindByAdmin {
  id: string | null | undefined;
  productCode: string | null | undefined;
  name: string | null | undefined;
  price: number | null | undefined;
  thumbnailLink: string | null | undefined;
  category: string | null | undefined;
  brand: string | null | undefined;
}
