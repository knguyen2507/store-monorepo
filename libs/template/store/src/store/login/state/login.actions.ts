import { createAction, props } from '@ngrx/store';
import { UserLoginModel } from '../login.model';

const LOGIN_ACTION = '[Login] Login';
const SAVE_USER_DATA_ACTION = '[Login] Save User Data';

export const login = createAction(LOGIN_ACTION, props<{ username: string; password: string }>());
export const saveUserData = createAction(SAVE_USER_DATA_ACTION, props<{ item: UserLoginModel }>());
