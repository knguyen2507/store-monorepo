import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import * as AppStore from '@store-monorepo/template/store';

@Component({
  selector: 'app-paginator-admin',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorAdminComponent implements OnInit {
  constructor(
    private store: Store<AppStore.ParameterStore.parameterReducers.ParameterState>
  ) {}

  offset = 0;
  limit = 50;

  pageEvent!: PageEvent;

  @Input() total!: number;
  @Input() sizeOptions!: number[];
  @Input() size!: number;

  @Output() paginatorChanged = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Hiển thị';
    this.paginator._intl.previousPageLabel = 'Trang trước';
    this.paginator._intl.nextPageLabel = 'Trang sau';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      return `Trang: ${page + 1}/${Math.ceil(length / pageSize)}`;
    };
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.limit = e.pageSize;
    this.offset = e.pageIndex * e.pageSize;
    this.store.dispatch(
      AppStore.ParameterStore.parameterActions.loadPagiAdmin({
        item: {
          limit: this.limit,
          offset: this.offset,
        },
      })
    );

    this.paginatorChanged.emit();
  }
}
