import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';
import { FindShopResultItem } from '../find/result';

export class GetShopInfoResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindShopResultItem>[];
}
