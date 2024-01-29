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
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {}

  images: any[] = [];
  productImages!: GalleryItem[];
  desciptions: DesObject[] = [];
  item: Partial<AppStore.ProductStore.ProductDetailModel> =
    AppStore.ProductStore.ProductReducers.initialProductDetail;

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 0);
  }

  getData() {
    this.store.dispatch(
      AppStore.ProductStore.ProductActions.loadProductById({
        id: this.data.productId,
      })
    );
    this.store
      .select(AppStore.ProductStore.ProductSelectors.selectProductById)
      .subscribe((data) => {
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
    this.store.dispatch(
      AppStore.ProductStore.ProductActions.resetProductById()
    );
  }
}
