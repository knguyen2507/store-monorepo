import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@store-monorepo/template/shared';
import { BrandComponent } from './brand.component';

const routes: Routes = [
  {
    path: 'cua-hang/nhan-hang/:brandCode',
    component: BrandComponent,
    title: 'Nhãn Hàng',
    data: {
      metadata: {
        pageTitle: 'Nhãn Hàng',
      },
    },
  },
];

@NgModule({
  declarations: [BrandComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class BrandModule {}
