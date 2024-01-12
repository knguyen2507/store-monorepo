import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, authnGuard } from '@store-monorepo/template/shared';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'quan-ly',
    component: HomeComponent,
    title: 'Trang Chủ Quản Lý',
    data: {
      metadata: {
        pageTitle: 'Trang Chủ Quản Lý',
      },
    },
    canActivate: [authnGuard],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forRoot(routes), CommonModule, SharedModule],
})
export class AdminHomeModule {}
