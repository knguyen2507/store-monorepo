import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DesObject } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    private store: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params) => {
      this.productCode = params['productCode'];
    });
  }

  public productCode!: string;

  images: any[] = [];
  productImages!: GalleryItem[];
  desciptions: DesObject[] = [];
  stock: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 0);
  }

  getData() {
    this.store.dispatch(
      AppStore.ProductStore.ProductActions.loadProductDetail({
        productCode: this.productCode,
      })
    );
    this.store
      .select(AppStore.ProductStore.ProductSelectors.selectProductDetail)
      .subscribe((data) => {
        if (data.id) this.handleViewedProduct(data.id);
        if (data.name)
          this.desciptions.push({
            key: 'Tên Sản Phẩm',
            value: data.name,
          });
        if (data.productCode)
          this.desciptions.push({
            key: 'Mã Sản Phẩm',
            value: data.productCode,
          });
        if (data.brand)
          this.desciptions.push({
            key: 'Hãng sản xuất',
            value: data.brand,
          });
        if (data.category)
          this.desciptions.push({
            key: 'Danh mục',
            value: data.category,
          });
        if (data.price)
          this.desciptions.push({
            key: 'Giá tiền',
            value: data.price.toString(),
          });

        if (data.qty && data.qty > 0) this.stock = true;

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

  handleViewedProduct(id: string) {
    const viewed_product = JSON.parse(
      localStorage.getItem('viewed') || '[]'
    ) as string[];
    if (!viewed_product.includes(id)) viewed_product.push(id);
    localStorage.setItem('viewed', JSON.stringify(viewed_product));
  }
}
