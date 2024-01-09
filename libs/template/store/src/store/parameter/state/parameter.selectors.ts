import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParameterState, parameterFeatureKey } from './parameter.reducers';

export const selectParameterState = createFeatureSelector<ParameterState>(parameterFeatureKey);

export const selectPagi = createSelector(selectParameterState, (state: ParameterState) => state.pagi);
export const selectPagiAdmin = createSelector(selectParameterState, (state: ParameterState) => state.pagiAdmin);
