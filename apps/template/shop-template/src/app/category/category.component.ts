import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppStore from '@store-monorepo/template/store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public categoryCode!: string;

  data!: Partial<AppStore.ProductStore.ProductModel>[];
  total = 0;
  pagi!: Partial<AppStore.ParameterStore.ParameterPagiModel>;
  categoryName: string = '';
  sizeOptions: number[] = [8, 16, 24];
  size: number = 8;

  constructor(
    route: ActivatedRoute,
    private parameterStore: Store<AppStore.ParameterStore.parameterReducers.ParameterState>,
    private productStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private categoryStore: Store<AppStore.CategoryStore.CategoryReducers.CategoryState>
  ) {
    route.params.subscribe((params) => {
      this.categoryCode = params['categoryCode'];
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getData();
      this.getList();
    });
  }

  getData() {
    this.categoryStore.dispatch(
      AppStore.CategoryStore.CategoryActions.loadCategoryByCode({
        code: this.categoryCode,
      })
    );
    this.categoryStore
      .select(AppStore.CategoryStore.CategorySelectors.selectCategoryByCode)
      .subscribe((data) => {
        this.categoryName = data.itemByCode.name ? data.itemByCode.name : '';
      });
  }

  getList() {
    this.parameterStore
      .select(AppStore.ParameterStore.parameterSelectors.selectPagi)
      .subscribe((data) => {
        this.pagi = data;
      });

    this.productStore.dispatch(
      AppStore.ProductStore.ProductActions.loadProductListByCategory({
        categoryCode: this.categoryCode,
        offset: this.pagi.offset ? this.pagi.offset : 0,
        limit: this.pagi.limit ? this.pagi.limit : 8,
      })
    );
    this.productStore
      .select(
        AppStore.ProductStore.ProductSelectors.selectProductListByCategory
      )
      .subscribe((data) => {
        this.data = data.itemByCategory;
        this.total = data.totalByCategory;
      });
  }

  onPaginatorChanged() {
    this.getList();
  }
}
