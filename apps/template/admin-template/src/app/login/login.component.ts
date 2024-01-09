import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { environment } from '@store-monorepo/template/environment';
import * as LeasingStore from '@store-monorepo/template/store';

interface ILoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  appMode = environment.mode;
  loginForm!: FormGroup<ILoginForm>;
  controls!: ILoginForm;

  username!: string | null;
  password!: string | null;

  constructor(
    private fb: FormBuilder,
    private store: Store<LeasingStore.LoginStore.LoginReducers.LoginState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group<ILoginForm>({
      username: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const raws = this.loginForm.getRawValue();
      this.store.dispatch(
        LeasingStore.LoginStore.LoginActions.login({
          username: raws.username ? raws.username : '',
          password: raws.password ? raws.password : '',
        })
      );
      this.store
        .select(LeasingStore.LoginStore.LoginSelectors.selectUserData)
        .subscribe((data) => {
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = `${environment.hostAdmin}/quan-ly`;
          }
        });
    }
  }

  onClick() {
    window.location.href = `${environment.hostShop}/cua-hang`;
  }
}
