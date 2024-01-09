import { Action, createReducer, on } from '@ngrx/store';
import { UserLoginModel } from '../login.model';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';

export interface LoginState {
  data: Partial<UserLoginModel>;
}

export const initialAccount: LoginState = {
  data: {
    user: {
      id: null,
      name: null,
      phone: null,
    },
    accessToken: null,
  },
};

const loginReducer = createReducer(
  initialAccount,
  on(LoginActions.saveUserData, (state: LoginState, { item }) => {
    return {
      ...state,
      data: item,
    };
  }),
);

export function loginReducers(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
