import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, authnGuard } from '@store-monorepo/template/shared';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: 'quan-ly/san-pham',
    component: ProductComponent,
    title: 'Sản Phẩm',
    data: {
      metadata: {
        pageTitle: 'Sản Phẩm',
      },
    },
    canActivate: [authnGuard],
  },
];

@NgModule({
  declarations: [ProductComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class ProductModule {}
