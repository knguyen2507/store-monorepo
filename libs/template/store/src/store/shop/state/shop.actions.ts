import { createAction, props } from '@ngrx/store';
import { ShopModel } from '../shop.model';

const LOAD_SHOP_LIST_ACTION = '[Shop] Load Shop List';
const SAVE_SHOP_LIST_ACTION = '[Shop] Save Shop List';
const LOAD_SHOP_DETAIL_ACTION = '[Shop] Load Shop Detail';
const SAVE_SHOP_DETAIL_ACTION = '[Shop] Save Shop Detail';
const LOAD_TOTAL_SHOP_ACTION = '[Shop] Load Total Shop';
const SAVE_TOTAL_SHOP_ACTION = '[Shop] Save Total Shop';
const RESET_SHOP_LIST_ACTION = '[Shop] Reset Shop List';
const RESET_SHOP_DETAIL_ACTION = '[Shop] Reset Shop Detail';

export const loadShopList = createAction(LOAD_SHOP_LIST_ACTION);
export const saveShopList = createAction(SAVE_SHOP_LIST_ACTION, props<{ items: ShopModel[]; total: number }>());
export const resetShopList = createAction(RESET_SHOP_LIST_ACTION);

export const loadShopDetail = createAction(LOAD_SHOP_DETAIL_ACTION, props<{ id: string }>());
export const saveShopDetail = createAction(SAVE_SHOP_DETAIL_ACTION, props<{ item: ShopModel }>());
export const resetShopDetail = createAction(RESET_SHOP_DETAIL_ACTION);

export const loadTotalShop = createAction(LOAD_TOTAL_SHOP_ACTION);
export const saveTotalShop = createAction(SAVE_TOTAL_SHOP_ACTION, props<{ total: number }>());
