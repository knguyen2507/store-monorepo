import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindShopResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
}

export class FindShopResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindShopResultItem>[];
  @Expose()
  readonly total: number;
}
