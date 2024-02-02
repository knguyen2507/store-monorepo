import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetShopInfo } from '.';
import { ShopQueryImplement } from '../../../../infrastructure/query/shop';
import { GetShopInfoResult } from './result';

@QueryHandler(GetShopInfo)
export class GetShopInfoHandler implements IQueryHandler<GetShopInfo, GetShopInfoResult> {
  @Inject()
  private readonly shop: ShopQueryImplement;

  async execute(query: GetShopInfo): Promise<GetShopInfoResult> {
    return await this.shop.findByIds(query);
  }
}
