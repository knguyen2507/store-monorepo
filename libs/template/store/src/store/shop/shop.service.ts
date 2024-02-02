import { Injectable } from '@angular/core';
import { environment } from '@store-monorepo/template/environment';
import { FindMany, HttpService, TotalModel } from '@store-monorepo/template/shared';
import { ShopModel } from './shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private httpService: HttpService) {}

  private apiUrl = `${environment.urlApi}/msx-authn`;

  findShopList() {
    return this.httpService.getAdmin<FindMany<ShopModel>>(`${this.apiUrl}/shop/find`);
  }

  findShopDetail(id: string) {
    return this.httpService.getAdmin<ShopModel>(`${this.apiUrl}/shop/detail`, {
      shopId: id,
    });
  }

  getTotalShop() {
    return this.httpService.getAdmin<TotalModel>(`${this.apiUrl}/shop/get-total-shop`);
  }
}
