import { createAction, props } from '@ngrx/store';
import { BrandModel } from '../brand.model';

const LOAD_BRAND_LIST_ACTION = '[Brand] Load Brand List';
const SAVE_BRAND_LIST_ACTION = '[Brand] Save Brand List';
const LOAD_BRAND_DETAIL_ACTION = '[Brand] Load Brand Detail';
const SAVE_BRAND_DETAIL_ACTION = '[Brand] Save Brand Detail';
const LOAD_BRAND_BY_CODE_ACTION = '[Brand] Load Brand By Code';
const SAVE_BRAND_BY_CODE_ACTION = '[Brand] Save Brand By Code';
const LOAD_TOTAL_BRAND_ACTION = '[Brand] Load Total Brand';
const SAVE_TOTAL_BRAND_ACTION = '[Brand] Save Total Brand';
const RESET_BRAND_LIST_ACTION = '[Brand] Reset Brand List';

export const loadBrandList = createAction(LOAD_BRAND_LIST_ACTION);
export const saveBrandList = createAction(SAVE_BRAND_LIST_ACTION, props<{ items: BrandModel[]; total: number }>());

export const loadBrandDetail = createAction(LOAD_BRAND_DETAIL_ACTION, props<{ id: string }>());
export const saveBrandDetail = createAction(SAVE_BRAND_DETAIL_ACTION, props<{ item: BrandModel }>());

export const loadBrandByCode = createAction(LOAD_BRAND_BY_CODE_ACTION, props<{ code: string }>());
export const saveBrandByCode = createAction(SAVE_BRAND_BY_CODE_ACTION, props<{ item: BrandModel }>());

export const loadTotalBrand = createAction(LOAD_TOTAL_BRAND_ACTION);
export const saveTotalBrand = createAction(SAVE_TOTAL_BRAND_ACTION, props<{ total: number }>());

export const resetBrandList = createAction(RESET_BRAND_LIST_ACTION);
