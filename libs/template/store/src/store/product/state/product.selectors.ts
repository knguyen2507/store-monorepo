import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productFeatureKey } from './product.reducers';

export const selectProductState = createFeatureSelector<ProductState>(productFeatureKey);

export const selectProductList = createSelector(selectProductState, (state: ProductState) => {
  return {
    items: state.items,
    total: state.total,
  };
});
export const selectProductListByAdmin = createSelector(selectProductState, (state: ProductState) => {
  return {
    itemByAdmin: state.itemByAdmin,
    totalByAdmin: state.totalByAdmin,
  };
});
export const selectProductDetail = createSelector(selectProductState, (state: ProductState) => state.itemDetail);
export const selectProductById = createSelector(selectProductState, (state: ProductState) => state.itemById);
export const selectProductListByBrand = createSelector(selectProductState, (state: ProductState) => {
  return {
    itemByBrand: state.itemByBrand,
    totalByBrand: state.totalByBrand,
  };
});
export const selectProductListByCategory = createSelector(selectProductState, (state: ProductState) => {
  return {
    itemByCategory: state.itemByCategory,
    totalByCategory: state.totalByCategory,
  };
});
export const selectTotalProduct = createSelector(selectProductState, (state: ProductState) => {
  return {
    totalProduct: state.totalProduct,
  };
});
export const selectShopListByProduct = createSelector(selectProductState, (state: ProductState) => {
  return {
    itemShop: state.itemShop,
    totalShop: state.totalShop,
  };
});
export const selectShopDetailByProduct = createSelector(selectProductState, (state: ProductState) => {
  return {
    itemDetailShop: state.itemDetailShop,
  };
});
