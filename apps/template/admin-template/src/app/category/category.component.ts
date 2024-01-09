import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppStore from '@store-monorepo/template/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private store: Store<AppStore.CategoryStore.CategoryReducers.CategoryState>
  ) {}

  gridOptions: GridOptions = {
    onGridReady: (e) => this.onGridReady(e),
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  data!: Partial<AppStore.CategoryStore.CategoryModel>[];
  colDefs: ColDef[] = [
    {
      headerName: 'STT',
      valueGetter: (p) => (p.node?.rowIndex as number) + 1,
      minWidth: 120,
      width: 120,
      sortable: false,
      filter: false,
    },
    { headerName: 'Mã Danh Mục', field: 'categoryCode' },
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
    this.store.dispatch(
      AppStore.CategoryStore.CategoryActions.loadCategoryList()
    );
    this.store
      .select(AppStore.CategoryStore.CategorySelectors.selectCategoryList)
      .subscribe((data) => {
        this.data = data.items;
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api = params.api;
  }
}
