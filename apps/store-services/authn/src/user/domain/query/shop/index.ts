import { FindShopById } from '../../../application/query/shop/detail';
import { FindShopByIdResult } from '../../../application/query/shop/detail/result';
import { FindShop } from '../../../application/query/shop/find';
import { FindShopResult } from '../../../application/query/shop/find/result';

export interface ShopQuery {
  find: (query: FindShop) => Promise<FindShopResult>;
  findById: (query: FindShopById) => Promise<FindShopByIdResult>;
}
