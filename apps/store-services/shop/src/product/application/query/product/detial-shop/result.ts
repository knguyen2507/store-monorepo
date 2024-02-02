import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindShopByProductResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
  @Expose()
  readonly qty: number;
}
