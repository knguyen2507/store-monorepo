import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DesObject, GeneralStatusEnum } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';
import { GalleryItem } from 'ng-gallery';

interface IProductForm {
  id: FormControl<string | null>;
  productCode: FormControl<string | null>;
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  qty: FormControl<number | null>;
  thumbnailLink: FormControl<string | null>;
  category: FormControl<string | null>;
  brand: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<GeneralStatusEnum | null>;
}

@Component({
  selector: 'app-admin-product-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class ProductCreateFormComponent implements OnInit {
  constructor(private store: Store<AppStore.ProductStore.ProductReducers.ProductState>, private fb: FormBuilder) {}

  productForm!: FormGroup<IProductForm>;
  images: any[] = [];
  listImages: any[] = [];
  imagesUpdated: any[] = [];
  avatar: any;
  productImages!: GalleryItem[];
  desciptions: DesObject[] = [];
  item: Partial<AppStore.ProductStore.ProductDetailModel> = AppStore.ProductStore.ProductReducers.initialProductDetail;

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.productForm = this.fb.group<IProductForm>({
      id: new FormControl(null),
      productCode: new FormControl(null),
      name: new FormControl(null),
      price: new FormControl(null),
      qty: new FormControl(null),
      thumbnailLink: new FormControl(null),
      category: new FormControl(null),
      brand: new FormControl(null),
      description: new FormControl(null),
      status: new FormControl(null),
    });
  }

  submit() {
    alert(`Tạo mới sản phẩm`);
  }

  getAvatar(avatar: string) {
    this.avatar = avatar;
  }

  getListImages(images: any[]) {
    this.listImages = images;
  }

  getImagesUpdate(images: any[]) {
    this.imagesUpdated = images;
  }

  add_des() {
    this.desciptions.push({ key: `Mô Tả ${this.desciptions.length + 1}`, value: '' });
    console.log(`desciptions:::`, this.desciptions);
  }
}
