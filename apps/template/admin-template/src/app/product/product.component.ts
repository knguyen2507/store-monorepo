import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppStore from '@store-monorepo/template/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private store: Store<AppStore.ProductStore.ProductReducers.ProductState>
  ) {}

  gridOptions: GridOptions = {
    onGridReady: (e) => this.onGridReady(e),
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  sizeOptions: number[] = [10, 20, 50, 100];
  total: number = 0;
  size: number = 50;
  data!: Partial<AppStore.ProductStore.ProductModelFindByAdmin>[];
  pagi!: Partial<AppStore.ParameterStore.ParameterPagiModel>;
  colDefs: ColDef[] = [
    {
      headerName: 'STT',
      valueGetter: (p) =>
        this.pagi.offset
          ? (p.node?.rowIndex as number) + this.pagi.offset + 1
          : (p.node?.rowIndex as number) + 1,
      minWidth: 120,
      width: 120,
      sortable: false,
      filter: false,
    },
    { headerName: 'Mã Sản Phẩm', field: 'productCode' },
    { headerName: 'Tên Sản Phẩm', field: 'name' },
    { headerName: 'Giá Sản Phẩm', field: 'price' },
    {
      headerName: 'Hình Ảnh',
      field: 'thumbnailLink',

      cellRenderer: (params: any) => {
        return `<img style="max-width: 60px; max-height: 60px" src="${params.value}" />`;
      },
    },
    { headerName: 'Hãng Sản Xuất', field: 'brand' },
    { headerName: 'Danh Mục', field: 'category' },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.getList();
    });
  }

  getList() {
    this.store
      .select(AppStore.ParameterStore.parameterSelectors.selectPagiAdmin)
      .subscribe((data) => {
        this.pagi = data;
      });

    this.store.dispatch(
      AppStore.ProductStore.ProductActions.loadProductListByAdmin({
        offset: this.pagi.offset ? this.pagi.offset : 0,
        limit: this.pagi.limit ? this.pagi.limit : 50,
      })
    );
    this.store
      .select(AppStore.ProductStore.ProductSelectors.selectProductListByAdmin)
      .subscribe((data) => {
        this.data = data.itemByAdmin.map((item) => {
          return {
            ...item,
            brand: item.brand ? this.capitalizeFirstLetter(item.brand) : '',
            category: item.category
              ? this.capitalizeFirstLetter(item.category)
              : '',
          };
        });
        this.total = data.totalByAdmin;
      });
  }

  onPaginatorChanged() {
    this.getList();
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api = params.api;
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
