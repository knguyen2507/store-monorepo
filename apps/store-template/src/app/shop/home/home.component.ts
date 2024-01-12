import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '@store-monorepo/template/environment';
import * as AppStore from '@store-monorepo/template/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private route: ActivatedRoute
  ) {}

  searchName!: string;
  appMode = environment.mode;
  sizeOptions: number[] = [8, 16, 24];
  size: number = 8;

  data!: Partial<AppStore.ProductStore.ProductModel>[];
  total = 0;
  pagi!: Partial<AppStore.ParameterStore.ParameterPagiModel>;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchName = params['tim-kiem'];
    });
    setTimeout(() => {
      this.getList();
    }, 0);
  }

  getList() {
    this.store
      .select(AppStore.ParameterStore.parameterSelectors.selectPagi)
      .subscribe((data) => {
        this.pagi = data;
      });

    this.store.dispatch(
      AppStore.ProductStore.ProductActions.loadProductList({
        offset: this.pagi.offset ? this.pagi.offset : 0,
        limit: this.pagi.limit ? this.pagi.limit : 8,
        searchName: this.searchName,
      })
    );
    this.store
      .select(AppStore.ProductStore.ProductSelectors.selectProductList)
      .subscribe((data) => {
        this.data = data.items;
        this.total = data.total;
      });
  }

  onPaginatorChanged() {
    this.getList();
  }
}
