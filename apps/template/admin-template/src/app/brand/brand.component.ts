import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppStore from '@store-monorepo/template/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  constructor(
    private store: Store<AppStore.BrandStore.BrandReducers.BrandState>
  ) {}

  gridOptions: GridOptions = {
    onGridReady: (e) => this.onGridReady(e),
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  data!: Partial<AppStore.BrandStore.BrandModel>[];
  colDefs: ColDef[] = [
    {
      headerName: 'STT',
      valueGetter: (p) => (p.node?.rowIndex as number) + 1,
      minWidth: 120,
      width: 120,
      sortable: false,
      filter: false,
    },
    { headerName: 'Mã Nhãn Hàng', field: 'brandCode' },
    { headerName: 'Tên Nhãn Hàng', field: 'name' },
    {
      headerName: 'Hình Ảnh',
      field: 'thumbnailLink',

      cellRenderer: (params: any) => {
        return `<img style="max-width: 60px; max-height: 60px" src="${params.value}" />`;
      },
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.getList();
    });
  }

  getList() {
    this.store.dispatch(AppStore.BrandStore.BrandActions.loadBrandList());
    this.store
      .select(AppStore.BrandStore.BrandSelectors.selectBrandList)
      .subscribe((data) => {
        this.data = data.items;
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api = params.api;
  }
}
