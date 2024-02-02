import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState, shopFeatureKey } from './shop.reducers';

export const selectShopState = createFeatureSelector<ShopState>(shopFeatureKey);

export const selectShopList = createSelector(selectShopState, (state: ShopState) => {
  return {
    items: state.items,
    total: state.total,
  };
});
export const selectShopDetail = createSelector(selectShopState, (state: ShopState) => {
  return {
    itemDetail: state.itemDetail,
  };
});
export const selectTotalShop = createSelector(selectShopState, (state: ShopState) => {
  return {
    totalShop: state.totalShop,
  };
});
