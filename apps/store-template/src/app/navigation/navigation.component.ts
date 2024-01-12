import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '@store-monorepo/template/environment';
import { AuthenticationService } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  constructor(
    private brandStore: Store<AppStore.BrandStore.BrandReducers.BrandState>,
    private categoryStore: Store<AppStore.CategoryStore.CategoryReducers.CategoryState>,
    private productStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private readonly authService: AuthenticationService,
    private router: Router
  ) {}

  dataSearch!: string;
  page: string = 'shop';
  product = 'san-pham';
  brand = 'nhan-hang';
  category = 'danh-muc';
  user = 'tai-khoan';

  menuGroups = [
    {
      matIcon: 'shop',
      title: 'Hãng sản xuất',
      menus: [] as any[],
    },
    {
      matIcon: 'bookmark',
      title: 'Danh mục',
      menus: [] as any[],
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      if (window.location.href.includes('quan-ly')) this.page = 'admin';
      if (this.page === 'shop') this.setShopItem();
    });
  }

  setShopItem() {
    // get data brand
    this.brandStore.dispatch(AppStore.BrandStore.BrandActions.loadBrandList());
    this.brandStore
      .select(AppStore.BrandStore.BrandSelectors.selectBrandList)
      .subscribe((data) => {
        let other = {};
        const brands = [];
        for (const item of data.items) {
          if (item.brandCode === 'khac') {
            other = {
              ...item,
              url: `cua-hang/nhan-hang/${item.brandCode}`,
              type: 'brand',
            };
          } else {
            brands.push({
              ...item,
              url: `cua-hang/nhan-hang/${item.brandCode}`,
              type: 'brand',
            });
          }
        }
        brands.push(other);

        this.menuGroups[0].menus = brands;
      });
    // get data category
    this.categoryStore.dispatch(
      AppStore.CategoryStore.CategoryActions.loadCategoryList()
    );
    this.categoryStore
      .select(AppStore.CategoryStore.CategorySelectors.selectCategoryList)
      .subscribe((data) => {
        let other = {};
        const categories = [];
        for (const item of data.items) {
          if (item.categoryCode === 'khac') {
            other = {
              ...item,
              url: `cua-hang/danh-muc/${item.categoryCode}`,
              type: 'category',
            };
          } else {
            categories.push({
              ...item,
              url: `cua-hang/danh-muc/${item.categoryCode}`,
              type: 'category',
            });
          }
        }
        categories.push(other);

        this.menuGroups[1].menus = categories;
      });
  }

  onClick() {
    if (this.page === 'shop')
      window.location.href = `${environment.host}/cua-hang`;
    if (this.page === 'admin')
      window.location.href = `${environment.host}/quan-ly`;
  }

  search() {
    window.location.href = `${environment.host}/cua-hang?tim-kiem=${this.dataSearch}`;
  }

  admin_page() {
    window.location.href = `${environment.host}/quan-ly`;
  }

  onActionClick(url: string, type: string) {
    if (type === 'brand')
      this.productStore.dispatch(
        AppStore.ProductStore.ProductActions.resetProductListByBrand()
      );
    if (type === 'category')
      this.productStore.dispatch(
        AppStore.ProductStore.ProductActions.resetProductListByCategory()
      );
    window.location.href = `${environment.host}/${url}`;
  }

  shop_page() {
    window.location.href = `${environment.host}/cua-hang`;
  }

  redirect_page(item: string) {
    window.location.href = `${environment.host}/quan-ly/${item}`;
  }

  logout() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.authService.logout().subscribe();
    }
    window.location.href = `${environment.host}/dang-nhap`;
    localStorage.removeItem(`accessToken`);
  }
}
