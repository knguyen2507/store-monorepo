import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindShopByIdResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
}
