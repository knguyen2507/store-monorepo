import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { UserService } from '../user.service';
import * as UserActions from './user.actions';
import { UserState } from './user.reducers';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService, private store: Store<UserState>) {}

  getCategoryList$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(UserActions.loadUserList),
        mergeMap((data) => {
          return this.userService.findUserList(data).pipe(
            map((res) => {
              return this.store.dispatch(UserActions.saveUserList({ items: res.items, total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  getTotalUser$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(UserActions.loadTotalUser),
        mergeMap(() => {
          return this.userService.getTotalUser().pipe(
            map((res) => {
              return this.store.dispatch(UserActions.saveTotalUser({ total: res.total }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
