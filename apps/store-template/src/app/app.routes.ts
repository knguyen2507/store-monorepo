import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'cua-hang',
    pathMatch: 'full',
  },
  {
    path: 'quan-ly',
    loadComponent: () =>
      import('@store-monorepo/template/admin-template').then(
        (m) => m.AdminTemplateComponent
      ),
  },
  {
    path: 'cua-hang',
    loadComponent: () =>
      import('@store-monorepo/template/shop-template').then(
        (m) => m.ShopTemplateComponent
      ),
  },
];
