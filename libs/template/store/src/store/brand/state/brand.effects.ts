import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { BrandService } from '../brand.service';
import * as BrandActions from './brand.actions';
import { BrandState } from './brand.reducers';

@Injectable()
export class BrandEffects {
  constructor(private action$: Actions, private brandService: BrandService, private store: Store<BrandState>) {}

  getBrandList$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(BrandActions.loadBrandList),
        mergeMap(() => {
          return this.brandService.findBrandList().pipe(
            map((res) => {
              return this.store.dispatch(BrandActions.saveBrandList({ items: res.items, total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getBrandDetail$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(BrandActions.loadBrandDetail),
        mergeMap((data) => {
          return this.brandService.findBrandDetail(data.id).pipe(
            map((res) => {
              return this.store.dispatch(BrandActions.saveBrandDetail({ item: res }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getBrandByCode$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(BrandActions.loadBrandByCode),
        mergeMap((data) => {
          return this.brandService.findBrandByCode(data.code).pipe(
            map((res) => {
              return this.store.dispatch(BrandActions.saveBrandByCode({ item: res }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getTotalBrand$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(BrandActions.loadTotalBrand),
        mergeMap(() => {
          return this.brandService.getTotalBrand().pipe(
            map((res) => {
              return this.store.dispatch(BrandActions.saveTotalBrand({ total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
