import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, loginFeatureKey } from './login.reducers';

export const selectLoginState = createFeatureSelector<LoginState>(loginFeatureKey);

export const selectUserData = createSelector(selectLoginState, (state: LoginState) => state.data);
