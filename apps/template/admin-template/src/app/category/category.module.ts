import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, authnGuard } from '@store-monorepo/template/shared';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: 'quan-ly/danh-muc',
    component: CategoryComponent,
    title: 'Danh Mục',
    data: {
      metadata: {
        pageTitle: 'Danh Mục',
      },
    },
    canActivate: [authnGuard],
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [RouterModule.forRoot(routes), SharedModule],
})
export class CategoryModule {}
