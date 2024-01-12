import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppStore from '@store-monorepo/template/store';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  public brandCode!: string;
  data!: Partial<AppStore.ProductStore.ProductModel>[];
  total = 0;
  pagi!: Partial<AppStore.ParameterStore.ParameterPagiModel>;
  searchName: any = {};
  brandName: string = '';
  sizeOptions: number[] = [8, 16, 24];
  size: number = 8;

  constructor(
    route: ActivatedRoute,
    private parameterStore: Store<AppStore.ParameterStore.parameterReducers.ParameterState>,
    private productStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private brandStore: Store<AppStore.BrandStore.BrandReducers.BrandState>
  ) {
    route.params.subscribe((params) => {
      this.brandCode = params['brandCode'];
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getData();
      this.getList();
    });
  }

  getData() {
    this.brandStore.dispatch(
      AppStore.BrandStore.BrandActions.loadBrandByCode({
        code: this.brandCode,
      })
    );
    this.brandStore
      .select(AppStore.BrandStore.BrandSelectors.selectBrandByCode)
      .subscribe((data) => {
        this.brandName = data.itemByCode.name ? data.itemByCode.name : '';
      });
  }

  getList() {
    this.parameterStore
      .select(AppStore.ParameterStore.parameterSelectors.selectPagi)
      .subscribe((data) => {
        this.pagi = data;
      });

    this.productStore.dispatch(
      AppStore.ProductStore.ProductActions.loadProductListByBrand({
        brandCode: this.brandCode,
        offset: this.pagi.offset ? this.pagi.offset : 0,
        limit: this.pagi.limit ? this.pagi.limit : 8,
      })
    );
    this.productStore
      .select(AppStore.ProductStore.ProductSelectors.selectProductListByBrand)
      .subscribe((data) => {
        this.data = data.itemByBrand;
        this.total = data.totalByBrand;
      });
  }

  onPaginatorChanged() {
    this.getList();
  }
}
