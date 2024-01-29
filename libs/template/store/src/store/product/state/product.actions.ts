import { createAction, props } from '@ngrx/store';
import {
  ProductDetailModel,
  ProductModel,
  ProductModelFindByAdmin,
} from '../product.model';

const LOAD_PRODUCT_LIST_ACTION = '[Product] Load Product List';
const SAVE_PRODUCT_LIST_ACTION = '[Product] Save Product List';
const LOAD_PRODUCT_LIST_BY_ADMIN_ACTION =
  '[Product] Load Product List By Admin';
const SAVE_PRODUCT_LIST_BY_ADMIN_ACTION =
  '[Product] Save Product List By Admin';
const LOAD_PRODUCT_LIST_BY_BRAND_ACTION =
  '[Product] Load Product List By Brand';
const SAVE_PRODUCT_LIST_BY_BRAND_ACTION =
  '[Product] Save Product List By Brand';
const RESET_PRODUCT_LIST_BY_BRAND_ACTION =
  '[Product] Reset Product List By Brand';
const LOAD_PRODUCT_LIST_BY_CATEGORY_ACTION =
  '[Product] Load Product List By Category';
const SAVE_PRODUCT_LIST_BY_CATEGORY_ACTION =
  '[Product] Save Product List By Category';
const RESET_PRODUCT_LIST_BY_CATEGORY_ACTION =
  '[Product] Reset Product List By Category';
const LOAD_PRODUCT_DETAIL_ACTION = '[Product] Load Product Detail';
const SAVE_PRODUCT_DETAIL_ACTION = '[Product] Save Product Detail';
const LOAD_PRODUCT_BY_ID_ACTION = '[Product] Load Product By Id';
const SAVE_PRODUCT_BY_ID_ACTION = '[Product] Save Product By Id';
const LOAD_TOTAL_PRODUCT_ACTION = '[Product] Load Total Product';
const SAVE_TOTAL_PRODUCT_ACTION = '[Product] Save Total Product';
const RESET_PRODUCT_DETAIL_ACTION = '[Product] Reset Product Detail';
const RESET_PRODUCT_BY_ID_ACTION = '[Product] Reset Product By Id';

export const loadProductList = createAction(
  LOAD_PRODUCT_LIST_ACTION,
  props<{ searchName?: string; offset: number; limit: number }>()
);
export const saveProductList = createAction(
  SAVE_PRODUCT_LIST_ACTION,
  props<{ items: ProductModel[]; total: number }>()
);

export const loadProductListByAdmin = createAction(
  LOAD_PRODUCT_LIST_BY_ADMIN_ACTION,
  props<{ offset: number; limit: number }>()
);
export const saveProductListByAdmin = createAction(
  SAVE_PRODUCT_LIST_BY_ADMIN_ACTION,
  props<{ items: ProductModelFindByAdmin[]; total: number }>()
);

export const loadProductListByBrand = createAction(
  LOAD_PRODUCT_LIST_BY_BRAND_ACTION,
  props<{ offset: number; limit: number; brandCode: string }>()
);
export const saveProductListByBrand = createAction(
  SAVE_PRODUCT_LIST_BY_BRAND_ACTION,
  props<{ items: ProductModel[]; total: number }>()
);
export const resetProductListByBrand = createAction(
  RESET_PRODUCT_LIST_BY_BRAND_ACTION
);

export const loadProductListByCategory = createAction(
  LOAD_PRODUCT_LIST_BY_CATEGORY_ACTION,
  props<{ offset: number; limit: number; categoryCode: string }>()
);
export const saveProductListByCategory = createAction(
  SAVE_PRODUCT_LIST_BY_CATEGORY_ACTION,
  props<{ items: ProductModel[]; total: number }>()
);
export const resetProductListByCategory = createAction(
  RESET_PRODUCT_LIST_BY_CATEGORY_ACTION
);

export const loadProductDetail = createAction(
  LOAD_PRODUCT_DETAIL_ACTION,
  props<{ productCode: string }>()
);
export const saveProductDetail = createAction(
  SAVE_PRODUCT_DETAIL_ACTION,
  props<{ item: ProductDetailModel }>()
);

export const loadProductById = createAction(
  LOAD_PRODUCT_BY_ID_ACTION,
  props<{ id: string }>()
);
export const saveProductById = createAction(
  SAVE_PRODUCT_BY_ID_ACTION,
  props<{ item: ProductDetailModel }>()
);

export const loadTotalProduct = createAction(LOAD_TOTAL_PRODUCT_ACTION);
export const saveTotalProduct = createAction(
  SAVE_TOTAL_PRODUCT_ACTION,
  props<{ total: number }>()
);

export const resetProductDetail = createAction(RESET_PRODUCT_DETAIL_ACTION);
export const resetProductById = createAction(RESET_PRODUCT_BY_ID_ACTION);
