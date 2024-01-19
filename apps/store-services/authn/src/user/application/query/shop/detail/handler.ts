import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindShopById } from '.';
import { ShopQueryImplement } from '../../../../infrastructure/query/shop';
import { FindShopByIdResult } from './result';

@QueryHandler(FindShopById)
export class FindShopByIdHandler
  implements IQueryHandler<FindShopById, FindShopByIdResult>
{
  @Inject()
  private readonly shop: ShopQueryImplement;

  async execute(query: FindShopById): Promise<FindShopByIdResult> {
    return await this.shop.findById(query);
  }
}
