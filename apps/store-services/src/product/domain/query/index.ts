import { FindProductByCode } from '../../application/query/product/detail';
import { FindProductByCodeResult } from '../../application/query/product/detail/result';
import { FindProduct } from '../../application/query/product/find';
import { FindProductByAdmin } from '../../application/query/product/find-by-admin';
import { FindProductByAdminResult } from '../../application/query/product/find-by-admin/result';
import { FindProductByBrand } from '../../application/query/product/find-by-brand';
import { FindProductByBrandResult } from '../../application/query/product/find-by-brand/result';
import { FindProductByCategory } from '../../application/query/product/find-by-category';
import { FindProductByCategoryResult } from '../../application/query/product/find-by-category/result';
import { FindProductByIds } from '../../application/query/product/find-by-ids';
import { FindProductByIdsResult } from '../../application/query/product/find-by-ids/result';
import { FindProductSimilar } from '../../application/query/product/find-similar';
import { FindProductSimilarResult } from '../../application/query/product/find-similar/result';
import { FindProductResult } from '../../application/query/product/find/result';
import { GetTotalProductResult } from '../../application/query/product/get-total/result';

export interface ProductQuery {
  find: (query: FindProduct) => Promise<FindProductResult>;
  findByAdmin: (query: FindProductByAdmin) => Promise<FindProductByAdminResult>;
  findByCode: (query: FindProductByCode) => Promise<FindProductByCodeResult>;
  findByBrand: (query: FindProductByBrand) => Promise<FindProductByBrandResult>;
  findByCategory: (query: FindProductByCategory) => Promise<FindProductByCategoryResult>;
  getTotal: () => Promise<GetTotalProductResult>;
  findByIds: (query: FindProductByIds) => Promise<FindProductByIdsResult>;
  findSimilar: (query: FindProductSimilar) => Promise<FindProductSimilarResult>;
}
