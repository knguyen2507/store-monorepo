import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindShopByProduct } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindShopByProductResult } from './result';

@QueryHandler(FindShopByProduct)
export class FindShopByProductHandler implements IQueryHandler<FindShopByProduct, FindShopByProductResult> {
  @Inject()
  private readonly product: ProductQueryImplement;

  async execute(query: FindShopByProduct): Promise<FindShopByProductResult> {
    return await this.product.findShopDetail(query);
  }
}
