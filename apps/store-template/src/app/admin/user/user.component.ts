import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppStore from '@store-monorepo/template/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private store: Store<AppStore.UserStore.UserReducers.UserState>
  ) {}

  gridOptions: GridOptions = {
    onGridReady: (e) => this.onGridReady(e),
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  sizeOptions: number[] = [10, 20, 50, 100];
  total: number = 0;
  size: number = 50;
  data!: Partial<AppStore.UserStore.UserModel>[];
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
    { headerName: 'Tên Đăng Nhập', field: 'username' },
    { headerName: 'Tên', field: 'name' },
    { headerName: 'SĐT', field: 'phone' },
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
      AppStore.UserStore.UserActions.loadUserList({
        offset: this.pagi.offset ? this.pagi.offset : 0,
        limit: this.pagi.limit ? this.pagi.limit : 50,
      })
    );
    this.store
      .select(AppStore.UserStore.UserSelectors.selectUserList)
      .subscribe((data) => {
        this.data = data.items;
        this.total = data.total;
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
