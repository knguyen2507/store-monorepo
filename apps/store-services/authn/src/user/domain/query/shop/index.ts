import { FindShopById } from '../../../application/query/shop/detail';
import { FindShopByIdResult } from '../../../application/query/shop/detail/result';
import { FindShop } from '../../../application/query/shop/find';
import { FindShopResult } from '../../../application/query/shop/find/result';
import { GetShopInfo } from '../../../application/query/shop/get-info';
import { GetShopInfoResult } from '../../../application/query/shop/get-info/result';

export interface ShopQuery {
  find: (query: FindShop) => Promise<FindShopResult>;
  findById: (query: FindShopById) => Promise<FindShopByIdResult>;
  findByIds: (query: GetShopInfo) => Promise<GetShopInfoResult>;
}
