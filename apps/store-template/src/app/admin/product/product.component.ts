import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './list/list.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @ViewChild('listProduct') listProduct!: ProductListComponent;
}
