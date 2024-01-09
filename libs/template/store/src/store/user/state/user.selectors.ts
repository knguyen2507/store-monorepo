import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from './user.reducers';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectTotalUser = createSelector(selectUserState, (state: UserState) => {
  return {
    totalUser: state.totalUser,
  };
});
export const selectUserList = createSelector(selectUserState, (state: UserState) => {
  return {
    items: state.items,
    total: state.total,
  };
});
