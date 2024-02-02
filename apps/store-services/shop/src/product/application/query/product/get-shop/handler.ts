import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetShopByProduct } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { GetShopByProductResult } from './result';

@QueryHandler(GetShopByProduct)
export class GetShopByProductHandler implements IQueryHandler<GetShopByProduct, GetShopByProductResult> {
  @Inject()
  private readonly product: ProductQueryImplement;

  async execute(query: GetShopByProduct): Promise<GetShopByProductResult> {
    return await this.product.findShop(query);
  }
}
