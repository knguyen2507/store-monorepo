import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@store-monorepo/template/shared';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: 'cua-hang/danh-muc/:categoryCode',
    component: CategoryComponent,
    title: 'Danh Mục',
    data: {
      metadata: {
        pageTitle: 'Danh Mục',
      },
    },
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class CategoryModule {}
