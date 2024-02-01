import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../category.model';

const LOAD_CATEGORY_LIST_ACTION = '[Category] Load Category List';
const SAVE_CATEGORY_LIST_ACTION = '[Category] Save Category List';
const LOAD_CATEGORY_DETAIL_ACTION = '[Category] Load Category Detail';
const SAVE_CATEGORY_DETAIL_ACTION = '[Category] Save Category Detail';
const LOAD_CATEGORY_BY_CODE_ACTION = '[Category] Load Category By Code';
const SAVE_CATEGORY_BY_CODE_ACTION = '[Category] Save Category By Code';
const LOAD_TOTAL_CATEGORY_ACTION = '[Category] Load Total Category';
const SAVE_TOTAL_CATEGORY_ACTION = '[Category] Save Total Category';
const RESET_CATEGORY_LIST_ACTION = '[Category] Reset Category List';

export const loadCategoryList = createAction(LOAD_CATEGORY_LIST_ACTION);
export const saveCategoryList = createAction(
  SAVE_CATEGORY_LIST_ACTION,
  props<{ items: CategoryModel[]; total: number }>(),
);

export const loadCategoryDetail = createAction(LOAD_CATEGORY_DETAIL_ACTION, props<{ id: string }>());
export const saveCategoryDetail = createAction(SAVE_CATEGORY_DETAIL_ACTION, props<{ item: CategoryModel }>());

export const loadCategoryByCode = createAction(LOAD_CATEGORY_BY_CODE_ACTION, props<{ code: string }>());
export const saveCategoryByCode = createAction(SAVE_CATEGORY_BY_CODE_ACTION, props<{ item: CategoryModel }>());

export const loadTotalCategory = createAction(LOAD_TOTAL_CATEGORY_ACTION);
export const saveTotalCategory = createAction(SAVE_TOTAL_CATEGORY_ACTION, props<{ total: number }>());

export const resetCategoryList = createAction(RESET_CATEGORY_LIST_ACTION);
