import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState, categoryFeatureKey } from './category.reducers';

export const selectCategoryState = createFeatureSelector<CategoryState>(categoryFeatureKey);

export const selectCategoryList = createSelector(selectCategoryState, (state: CategoryState) => {
  return {
    items: state.items,
    total: state.total,
  };
});

export const selectCategoryDetail = createSelector(selectCategoryState, (state: CategoryState) => {
  return {
    itemDetail: state.itemDetail,
  };
});

export const selectCategoryByCode = createSelector(selectCategoryState, (state: CategoryState) => {
  return {
    itemByCode: state.itemByCode,
  };
});

export const selectTotalCategory = createSelector(selectCategoryState, (state: CategoryState) => {
  return {
    totalCategory: state.totalCategory,
  };
});
