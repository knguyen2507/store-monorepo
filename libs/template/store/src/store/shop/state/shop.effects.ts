import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, take } from 'rxjs';
import { ShopService } from '../shop.service';
import * as ShopActions from './shop.actions';
import { ShopState } from './shop.reducers';

@Injectable()
export class ShopEffects {
  constructor(private action$: Actions, private shopService: ShopService, private store: Store<ShopState>) {}

  getShopList$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(ShopActions.loadShopList),
        mergeMap(() => {
          return this.shopService.findShopList().pipe(
            map((res) => {
              return this.store.dispatch(ShopActions.saveShopList({ items: res.items, total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getShopDetail$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(ShopActions.loadShopDetail),
        mergeMap((data) => {
          return this.shopService.findShopDetail(data.id).pipe(
            map((res) => {
              return this.store.dispatch(ShopActions.saveShopDetail({ item: res }));
            }),
          );
        }),
        take(1),
      );
    },
    { dispatch: false },
  );

  getTotalShop$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(ShopActions.loadTotalShop),
        mergeMap(() => {
          return this.shopService.getTotalShop().pipe(
            map((res) => {
              return this.store.dispatch(ShopActions.saveTotalShop({ total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
