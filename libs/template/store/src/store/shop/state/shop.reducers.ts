import { Action, createReducer, on } from '@ngrx/store';
import { ShopModel } from '../shop.model';
import * as ShopActions from './shop.actions';

export const shopFeatureKey = 'shop';

const ShopModelInitial = {
  id: null,
  name: null,
  address: null,
};

export interface ShopState {
  items: Partial<ShopModel>[];
  total: number;
  itemDetail: Partial<ShopModel>;
  totalShop: number;
}

export const initialShop: ShopState = {
  items: [],
  total: 0,
  itemDetail: ShopModelInitial,
  totalShop: 0,
};

const shopReducer = createReducer(
  initialShop,
  on(ShopActions.saveShopList, (state: ShopState, { items, total }) => {
    return {
      ...state,
      items,
      total,
    };
  }),
  on(ShopActions.saveShopDetail, (state: ShopState, { item }) => {
    return {
      ...state,
      itemDetail: item,
    };
  }),
  on(ShopActions.saveTotalShop, (state: ShopState, { total }) => {
    return {
      ...state,
      totalShop: total,
    };
  }),
  on(ShopActions.resetShopList, (state: ShopState) => {
    return {
      ...state,
      items: initialShop.items,
      total: initialShop.total,
    };
  }),
  on(ShopActions.resetShopDetail, (state: ShopState) => {
    return {
      ...state,
      itemDetail: initialShop.itemDetail,
    };
  }),
);

export function shopReducers(state: ShopState | undefined, action: Action) {
  return shopReducer(state, action);
}
