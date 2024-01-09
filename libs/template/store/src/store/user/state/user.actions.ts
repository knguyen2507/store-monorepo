import { createAction, props } from '@ngrx/store';
import { UserModel } from '../user.model';

const LOAD_USER_LIST_ACTION = '[User] Load User List';
const SAVE_USER_LIST_ACTION = '[User] Save User List';
const LOAD_TOTAL_USER_ACTION = '[User] Load Total User';
const SAVE_TOTAL_USER_ACTION = '[User] Save Total User';

export const loadUserList = createAction(LOAD_USER_LIST_ACTION, props<{ offset: number; limit: number }>());
export const saveUserList = createAction(SAVE_USER_LIST_ACTION, props<{ items: UserModel[]; total: number }>());

export const loadTotalUser = createAction(LOAD_TOTAL_USER_ACTION);
export const saveTotalUser = createAction(SAVE_TOTAL_USER_ACTION, props<{ total: number }>());
