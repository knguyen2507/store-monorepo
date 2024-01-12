import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@store-monorepo/template/shared';
import { DetailProductComponent } from './detail-product.component';

const routes: Routes = [
  {
    path: 'cua-hang/san-pham/chi-tiet/:productCode',
    component: DetailProductComponent,
    title: 'Chi Tiết Sản Phẩm',
    data: {
      metadata: {
        pageTitle: 'Chi Tiết Sản Phẩm',
      },
    },
  },
];

@NgModule({
  declarations: [DetailProductComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class DetailProductModule {}
