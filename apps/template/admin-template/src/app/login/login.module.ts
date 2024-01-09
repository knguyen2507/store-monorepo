import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@store-monorepo/template/shared';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'dang-nhap',
    component: LoginComponent,
    title: 'Form Đăng Nhập',
    data: {
      metadata: {
        pageTitle: 'Đăng Nhập',
      },
    },
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forRoot(routes), SharedModule, CommonModule],
  exports: [],
})
export class LoginModule {}
