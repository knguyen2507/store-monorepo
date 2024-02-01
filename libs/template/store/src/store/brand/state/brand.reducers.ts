import { Action, createReducer, on } from '@ngrx/store';
import { BrandModel } from '../brand.model';
import * as BrandActions from './brand.actions';

export const brandFeatureKey = 'brand';

const BrandModelInitial = {
  id: null,
  brandCode: null,
  name: null,
  thumbnailLink: null,
};

export interface BrandState {
  items: Partial<BrandModel>[];
  total: number;
  itemDetail: Partial<BrandModel>;
  itemByCode: Partial<BrandModel>;
  totalBrand: number;
}

export const initialBrand: BrandState = {
  items: [],
  total: 0,
  itemDetail: BrandModelInitial,
  itemByCode: BrandModelInitial,
  totalBrand: 0,
};

const brandReducer = createReducer(
  initialBrand,
  on(BrandActions.saveBrandList, (state: BrandState, { items, total }) => {
    return {
      ...state,
      items,
      total,
    };
  }),
  on(BrandActions.saveBrandDetail, (state: BrandState, { item }) => {
    return {
      ...state,
      itemDetail: item,
    };
  }),
  on(BrandActions.saveBrandByCode, (state: BrandState, { item }) => {
    return {
      ...state,
      itemByCode: item,
    };
  }),
  on(BrandActions.saveTotalBrand, (state: BrandState, { total }) => {
    return {
      ...state,
      totalBrand: total,
    };
  }),
  on(BrandActions.resetBrandList, (state: BrandState) => {
    return {
      ...state,
      items: initialBrand.items,
      total: initialBrand.total,
    };
  }),
);

export function brandReducers(state: BrandState | undefined, action: Action) {
  return brandReducer(state, action);
}
