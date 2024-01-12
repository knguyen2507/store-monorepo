import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, authnGuard } from '@store-monorepo/template/shared';
import { BrandComponent } from './brand.component';

const routes: Routes = [
  {
    path: 'quan-ly/nhan-hang',
    component: BrandComponent,
    title: 'Nhãn Hàng',
    data: {
      metadata: {
        pageTitle: 'Nhãn Hàng',
      },
    },
    canActivate: [authnGuard],
  },
];

@NgModule({
  declarations: [BrandComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class AdminBrandModule {}
