import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DesObject } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private store: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
  ) {}

  images: any[] = [];
  listImages: any[] = [];
  productImages!: GalleryItem[];
  desciptions: DesObject[] = [];
  item: Partial<AppStore.ProductStore.ProductDetailModel> = AppStore.ProductStore.ProductReducers.initialProductDetail;
  shop: Partial<AppStore.ProductStore.ShopModel> = AppStore.ProductStore.ProductReducers.initialProduct.itemDetailShop;
  shopSource: any[] = [];
  selectedShop!: any | null;
  qty: number = 0;

  ngOnInit(): void {
    this.getData();
    this.setShopList();
  }

  getData() {
    this.store.dispatch(
      AppStore.ProductStore.ProductActions.loadProductById({
        id: this.data.productId,
      }),
    );
    this.store.select(AppStore.ProductStore.ProductSelectors.selectProductById).subscribe((data) => {
      this.item = data;

      this.images = data.images ? data.images : [];
      if (data.images)
        this.productImages = data.images.map((item) => {
          return new ImageItem({ src: item.url, thumb: item.url });
        });
      this.desciptions = data.description
        ? [...this.desciptions, ...this.handleDescription(data.description)]
        : [...this.desciptions];
    });
  }

  handleDescription(description: string): DesObject[] {
    const data: DesObject[] = [];
    const paragraphs = description.split('*done*');
    for (const item of paragraphs) {
      const sentenceSplit = item.split(':');
      data.push({
        key: sentenceSplit[0],
        value: sentenceSplit[1],
      });
    }
    return data;
  }

  reset() {
    this.store.dispatch(AppStore.ProductStore.ProductActions.resetProductById());
    this.store.dispatch(AppStore.ProductStore.ProductActions.resetShopListByProduct());
  }

  getListImages(images: any[]) {
    this.listImages = images;
  }

  splitTime(dateTime: Date | null | undefined) {
    if (dateTime) return dateTime.toString().split('T')[0];
    return null;
  }

  setShopList() {
    this.store.dispatch(AppStore.ProductStore.ProductActions.loadShopListByProduct({ id: this.data.productId }));
    this.store.select(AppStore.ProductStore.ProductSelectors.selectShopListByProduct).subscribe((data) => {
      data.itemShop.forEach((item) => {
        if (item.id) {
          this.shopSource = [...this.shopSource, { id: item.id, label: item.name }];
        }
      });
      if (data.itemShop[0]) {
        this.selectedShop = data.itemShop[0].id;
        this.shopChange(data.itemShop[0]);
      }
    });
  }

  shopChange(selectedShop: any) {
    if (selectedShop) {
      this.store.dispatch(
        AppStore.ProductStore.ProductActions.loadShopDetailByProduct({
          id: this.data.productId,
          shopId: selectedShop.id,
        }),
      );
      this.store.select(AppStore.ProductStore.ProductSelectors.selectShopDetailByProduct).subscribe((data) => {
        this.shop = data.itemDetailShop;
      });
      this.store.dispatch(AppStore.ProductStore.ProductActions.resetShopListByProduct());
    } else {
      this.shop = AppStore.ShopStore.ShopReducers.initialShop.itemDetail;
    }
  }
}
