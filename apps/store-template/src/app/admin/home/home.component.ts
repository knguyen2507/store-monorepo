import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '@store-monorepo/template/environment';
import * as AppStore from '@store-monorepo/template/store';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userStore: Store<AppStore.UserStore.UserReducers.UserState>,
    private productStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private categoryStore: Store<AppStore.CategoryStore.CategoryReducers.CategoryState>,
    private brandStore: Store<AppStore.BrandStore.BrandReducers.BrandState>
  ) {}

  totalUser: number = 0;
  totalProduct: number = 0;
  totalCategory: number = 0;
  totalBrand: number = 0;

  product = 'san-pham';
  brand = 'nhan-hang';
  category = 'danh-muc';
  user = 'tai-khoan';

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    });
  }

  getData() {
    if (localStorage.getItem('permission') === 'true') {
      this.userStore.dispatch(AppStore.UserStore.UserActions.loadTotalUser());
      this.userStore
        .select(AppStore.UserStore.UserSelectors.selectTotalUser)
        .subscribe((data) => {
          this.totalUser = data.totalUser;
        });
    } else {
      this.totalUser = 0;
    }

    this.productStore.dispatch(
      AppStore.ProductStore.ProductActions.loadTotalProduct()
    );
    this.productStore
      .select(AppStore.ProductStore.ProductSelectors.selectTotalProduct)
      .subscribe((data) => {
        this.totalProduct = data.totalProduct;
      });

    this.categoryStore.dispatch(
      AppStore.CategoryStore.CategoryActions.loadTotalCategory()
    );
    this.categoryStore
      .select(AppStore.CategoryStore.CategorySelectors.selectTotalCategory)
      .subscribe((data) => {
        this.totalCategory = data.totalCategory;
      });

    this.brandStore.dispatch(AppStore.BrandStore.BrandActions.loadTotalBrand());
    this.brandStore
      .select(AppStore.BrandStore.BrandSelectors.selectTotalBrand)
      .subscribe((data) => {
        this.totalBrand = data.totalBrand;
      });
  }

  redirect_page(item: string) {
    window.location.href = `${environment.host}/quan-ly/${item}`;
  }
}
