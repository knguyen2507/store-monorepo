import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductByBrandResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly productCode: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly price: number;
  @Expose()
  readonly thumbnailLink: string;
}

export class FindProductByBrandResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductByBrandResultItem>[];
  @Expose()
  readonly total: number;
}
