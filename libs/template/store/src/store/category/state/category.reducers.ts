import { Action, createReducer, on } from '@ngrx/store';
import { CategoryModel } from '../category.model';
import * as CategoryActions from './category.actions';

export const categoryFeatureKey = 'category';

const CategoryModelInitial = {
  id: null,
  categoryCode: null,
  name: null,
  thumbnailLink: null,
};

export interface CategoryState {
  items: Partial<CategoryModel>[];
  total: number;
  itemDetail: Partial<CategoryModel>;
  itemByCode: Partial<CategoryModel>;
  totalCategory: number;
}

export const initialCategory: CategoryState = {
  items: [],
  total: 0,
  itemDetail: CategoryModelInitial,
  itemByCode: CategoryModelInitial,
  totalCategory: 0,
};

const categoryReducer = createReducer(
  initialCategory,
  on(CategoryActions.saveCategoryList, (state: CategoryState, { items, total }) => {
    return {
      ...state,
      items,
      total,
    };
  }),
  on(CategoryActions.saveCategoryDetail, (state: CategoryState, { item }) => {
    return {
      ...state,
      itemDetail: item,
    };
  }),
  on(CategoryActions.saveCategoryByCode, (state: CategoryState, { item }) => {
    return {
      ...state,
      itemByCode: item,
    };
  }),
  on(CategoryActions.saveTotalCategory, (state: CategoryState, { total }) => {
    return {
      ...state,
      totalCategory: total,
    };
  }),
  on(CategoryActions.resetCategoryList, (state: CategoryState) => {
    return {
      ...state,
      items: initialCategory.items,
      total: initialCategory.total,
    };
  }),
);

export function categoryReducers(state: CategoryState | undefined, action: Action) {
  return categoryReducer(state, action);
}
