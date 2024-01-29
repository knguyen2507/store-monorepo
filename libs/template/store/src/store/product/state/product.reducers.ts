import { Action, createReducer, on } from '@ngrx/store';
import {
  ProductDetailModel,
  ProductModel,
  ProductModelFindByAdmin,
} from '../product.model';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  items: Partial<ProductModel>[];
  total: number;
  itemByAdmin: Partial<ProductModelFindByAdmin>[];
  totalByAdmin: number;
  itemDetail: Partial<ProductDetailModel>;
  itemById: Partial<ProductDetailModel>;
  itemByBrand: Partial<ProductModel>[];
  totalByBrand: number;
  itemByCategory: Partial<ProductModel>[];
  totalByCategory: number;
  totalProduct: number;
}

export const initialProductDetail = {
  id: null,
  name: null,
  price: null,
  thumbnailLink: null,
  category: null,
  brand: null,
  description: null,
  images: [],
};

export const initialProduct: ProductState = {
  items: [],
  total: 0,
  itemByAdmin: [],
  totalByAdmin: 0,
  itemDetail: initialProductDetail,
  itemById: initialProductDetail,
  itemByBrand: [],
  totalByBrand: 0,
  itemByCategory: [],
  totalByCategory: 0,
  totalProduct: 0,
};

const productReducer = createReducer(
  initialProduct,
  on(
    ProductActions.saveProductList,
    (state: ProductState, { items, total }) => {
      return {
        ...state,
        items,
        total,
      };
    }
  ),
  on(
    ProductActions.saveProductListByAdmin,
    (state: ProductState, { items, total }) => {
      return {
        ...state,
        itemByAdmin: items,
        totalByAdmin: total,
      };
    }
  ),
  on(ProductActions.saveProductDetail, (state: ProductState, { item }) => {
    return {
      ...state,
      itemDetail: item,
    };
  }),
  on(ProductActions.saveProductById, (state: ProductState, { item }) => {
    return {
      ...state,
      itemById: item,
    };
  }),
  on(
    ProductActions.saveProductListByBrand,
    (state: ProductState, { items, total }) => {
      return {
        ...state,
        itemByBrand: items,
        totalByBrand: total,
      };
    }
  ),
  on(ProductActions.resetProductListByBrand, (state: ProductState) => {
    return {
      ...state,
      itemByBrand: initialProduct.itemByBrand,
      totalByBrand: initialProduct.totalByBrand,
    };
  }),
  on(
    ProductActions.saveProductListByCategory,
    (state: ProductState, { items, total }) => {
      return {
        ...state,
        itemByCategory: items,
        totalByCategory: total,
      };
    }
  ),
  on(ProductActions.resetProductListByCategory, (state: ProductState) => {
    return {
      ...state,
      itemByCategory: initialProduct.itemByCategory,
      totalByCategory: initialProduct.totalByCategory,
    };
  }),
  on(ProductActions.resetProductDetail, (state: ProductState) => {
    return {
      ...state,
      itemDetail: initialProductDetail,
    };
  }),
  on(ProductActions.resetProductById, (state: ProductState) => {
    return {
      ...state,
      itemById: initialProductDetail,
    };
  }),
  on(ProductActions.saveTotalProduct, (state: ProductState, { total }) => {
    return {
      ...state,
      totalProduct: total,
    };
  })
);

export function productReducers(
  state: ProductState | undefined,
  action: Action
) {
  return productReducer(state, action);
}
