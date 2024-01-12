import { Component, Input } from '@angular/core';
import { environment } from '@store-monorepo/template/environment';

import * as AppStore from '@store-monorepo/template/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() data!: Partial<AppStore.ProductStore.ProductModel>[];

  detailCard(item: Partial<AppStore.ProductStore.ProductModel>) {
    window.location.href = `${environment.host}/cua-hang/san-pham/chi-tiet/${item.productCode}`;
  }
}
