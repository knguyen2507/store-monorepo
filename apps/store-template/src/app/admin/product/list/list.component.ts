import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AgGridCustomTextFilterComponent, TemplateRendererComponent } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ProductDetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    public dialog: MatDialog,
  ) {}

  gridOptions: GridOptions = {
    animateRows: true,
    enableCellTextSelection: true,
    suppressCellFocus: true,
    suppressMenuHide: true,
    rowSelection: 'multiple',
    icons: {
      menu: '<span class="ag-icon ag-icon-small-down" style="font-size: 32px"></span>',
    },
    defaultColDef: {
      sortable: false,
      filter: false,
    },
    onGridReady: (e) => this.onGridReady(e),
    onFirstDataRendered: () => this.onFirstDataRendered(),
    onFilterChanged: () => this.onFilterChanged(),
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild('action') action!: TemplateRef<any>;

  sizeOptions: number[] = [10, 20, 50, 100];
  total: number = 0;
  size: number = 50;
  data!: Partial<AppStore.ProductStore.ProductModelFindByAdmin>[];
  pagi!: Partial<AppStore.ParameterStore.ParameterPagiModel>;
  searchModel: any = {};
  columnDefs!: ColDef[];

  buildProductColumns(): ColDef[] {
    return [
      {
        headerName: 'STT',
        valueGetter: (p) =>
          this.pagi.offset ? (p.node?.rowIndex as number) + this.pagi.offset + 1 : (p.node?.rowIndex as number) + 1,
        minWidth: 120,
        width: 120,
        sortable: false,
        filter: false,
      },
      { headerName: 'Mã Sản Phẩm', field: 'productCode' },
      {
        headerName: 'Tên Sản Phẩm',
        filter: AgGridCustomTextFilterComponent,
        field: 'name',
      },
      { headerName: 'Giá Sản Phẩm', field: 'price' },
      { headerName: 'Tổng Tồn Kho', field: 'qty' },
      {
        headerName: 'Hình Ảnh',
        field: 'thumbnailLink',
        cellRenderer: (params: any) => {
          return `<img style="max-width: 60px; max-height: 60px" src="${params.value}" />`;
        },
      },
      { headerName: 'Hãng Sản Xuất', field: 'brand' },
      { headerName: 'Danh Mục', field: 'category' },
      {
        headerName: 'Thao tác',
        cellRenderer: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.action,
        },
        minWidth: 150,
        width: 150,
        field: 'action',
        pinned: 'right',
      },
    ];
  }

  ngAfterViewInit(): void {
    this.columnDefs = this.buildProductColumns();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getList();
    });
  }

  getList() {
    this.store.select(AppStore.ParameterStore.parameterSelectors.selectPagiAdmin).subscribe((data) => {
      this.pagi = data;
    });

    this.store.dispatch(
      AppStore.ProductStore.ProductActions.loadProductListByAdmin({
        offset: this.pagi.offset ? this.pagi.offset : 0,
        limit: this.pagi.limit ? this.pagi.limit : 50,
      }),
    );
    this.store.select(AppStore.ProductStore.ProductSelectors.selectProductListByAdmin).subscribe((data) => {
      this.data = data.itemByAdmin.map((item) => {
        return {
          ...item,
          brand: item.brand ? this.capitalizeFirstLetter(item.brand) : '',
          category: item.category ? this.capitalizeFirstLetter(item.category) : '',
        };
      });
      this.total = data.totalByAdmin;
    });
  }

  onPaginatorChanged() {
    this.getList();
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(data: any, e: Event) {
    console.log(`delete...`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  detailRow(data: AppStore.ProductStore.ProductModel, e: Event) {
    e.stopPropagation();
    this.dialog
      .open(ProductDetailComponent, {
        disableClose: true,
        minWidth: '80vw',
        panelClass: 'custom-dialog-style',
        data: {
          productId: data.id,
        },
      })
      .afterClosed()
      .subscribe(() => {});
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api = params.api;
  }
  onFirstDataRendered(): void {
    this.agGrid.api.autoSizeAllColumns();
  }
  onFilterChanged(): void {
    this.searchModel = this.agGrid.api.getFilterModel();
    this.getList();
  }
}
