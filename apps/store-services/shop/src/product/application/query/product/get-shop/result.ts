import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetShopByProductResultItem implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
}

export class GetShopByProductResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<GetShopByProductResultItem>[];
  @Expose()
  readonly total: number;
}
