import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '../user.model';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  items: UserModel[];
  total: number;
  totalUser: number;
}

export const initialUser: UserState = {
  items: [],
  total: 0,
  totalUser: 0,
};

const userReducer = createReducer(
  initialUser,
  on(UserActions.saveTotalUser, (state: UserState, { total }) => {
    return {
      ...state,
      totalUser: total,
    };
  }),
  on(UserActions.saveUserList, (state: UserState, { items, total }) => {
    return {
      ...state,
      items: items,
      total: total,
    };
  }),
);

export function userReducers(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
