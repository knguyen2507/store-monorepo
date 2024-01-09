import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, authnGuard } from '@store-monorepo/template/shared';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'quan-ly/tai-khoan',
    component: UserComponent,
    title: 'Tài Khoản',
    data: {
      metadata: {
        pageTitle: 'Tài Khoản',
      },
    },
    canActivate: [authnGuard],
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class UserModule {}
