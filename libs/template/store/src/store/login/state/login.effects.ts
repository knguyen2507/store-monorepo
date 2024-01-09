import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { LoginService } from '../login.service';
import * as LoginActions from './login.actions';
import { LoginState } from './login.reducers';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private loginService: LoginService, private store: Store<LoginState>) {}

  login$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LoginActions.login),
        mergeMap((data) => {
          return this.loginService.login({ username: data.username, password: data.password }).pipe(
            map((res) => {
              return this.store.dispatch(LoginActions.saveUserData({ item: res }));
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );
}
