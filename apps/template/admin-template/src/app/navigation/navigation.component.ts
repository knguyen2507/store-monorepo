import { Component, OnInit } from '@angular/core';
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
  product = 'san-pham';
  brand = 'nhan-hang';
  category = 'danh-muc';
  user = 'tai-khoan';
  constructor(
    private readonly authService: AuthenticationService,
    private productStore: Store<AppStore.ProductStore.ProductReducers.ProductState>
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setItem();
    });
  }

  setItem() {}

  onClick() {
    window.location.href = `${environment.hostAdmin}/quan-ly`;
  }

  shop_page() {
    window.location.href = `${environment.hostShop}/cua-hang`;
  }

  redirect_page(item: string) {
    window.location.href = `${environment.hostAdmin}/quan-ly/${item}`;
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
    window.location.href = `${environment.hostAdmin}/${url}`;
  }

  logout() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.authService.logout().subscribe();
    }
    window.location.href = `${environment.hostAdmin}/dang-nhap`;
    localStorage.removeItem(`accessToken`);
  }
}
