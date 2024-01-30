import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateFormComponent } from './create-form/create-form.component';
import { ProductListComponent } from './list/list.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  constructor(public dialog: MatDialog) {}

  @ViewChild('listProduct') listProduct!: ProductListComponent;

  openCreateDialog() {
    this.dialog
      .open(ProductCreateFormComponent, {
        disableClose: true,
        minWidth: '80vw',
        panelClass: 'custom-dialog-style',
      })
      .afterClosed()
      .subscribe(() => {
        this.listProduct.getList();
      });
  }
}
