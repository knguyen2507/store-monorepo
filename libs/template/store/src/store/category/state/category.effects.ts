import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { CategoryService } from '../category.service';
import * as CategoryActions from './category.actions';
import { CategoryState } from './category.reducers';

@Injectable()
export class CategoryEffects {
  constructor(
    private action$: Actions,
    private categoryService: CategoryService,
    private store: Store<CategoryState>,
  ) {}

  getCategoryList$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(CategoryActions.loadCategoryList),
        mergeMap(() => {
          return this.categoryService.findCategoryList().pipe(
            map((res) => {
              return this.store.dispatch(CategoryActions.saveCategoryList({ items: res.items, total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getCategoryDetail$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(CategoryActions.loadCategoryDetail),
        mergeMap((data) => {
          return this.categoryService.findCategoryDetail(data.id).pipe(
            map((res) => {
              return this.store.dispatch(CategoryActions.saveCategoryDetail({ item: res }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getCategoryByCode$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(CategoryActions.loadCategoryByCode),
        mergeMap((data) => {
          return this.categoryService.findCategoryByCode(data.code).pipe(
            map((res) => {
              return this.store.dispatch(CategoryActions.saveCategoryByCode({ item: res }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getTotalCategory$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(CategoryActions.loadTotalCategory),
        mergeMap(() => {
          return this.categoryService.getTotalCategory().pipe(
            map((res) => {
              return this.store.dispatch(CategoryActions.saveTotalCategory({ total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
