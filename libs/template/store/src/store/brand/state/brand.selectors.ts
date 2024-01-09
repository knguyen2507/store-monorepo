import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandState, brandFeatureKey } from './brand.reducers';

export const selectBrandState = createFeatureSelector<BrandState>(brandFeatureKey);

export const selectBrandList = createSelector(selectBrandState, (state: BrandState) => {
  return {
    items: state.items,
    total: state.total,
  };
});
export const selectBrandDetail = createSelector(selectBrandState, (state: BrandState) => {
  return {
    itemDetail: state.itemDetail,
  };
});
export const selectBrandByCode = createSelector(selectBrandState, (state: BrandState) => {
  return {
    itemByCode: state.itemByCode,
  };
});
export const selectTotalBrand = createSelector(selectBrandState, (state: BrandState) => {
  return {
    totalBrand: state.totalBrand,
  };
});
