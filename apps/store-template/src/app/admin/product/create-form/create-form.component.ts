import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DesObject, GeneralStatusEnum } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';
import * as Notiflix from 'notiflix';

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
  constructor(
    private productStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private brandStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private categoryStore: Store<AppStore.ProductStore.ProductReducers.ProductState>,
    private fb: FormBuilder,
  ) {}

  productForm!: FormGroup<IProductForm>;
  controls!: IProductForm;
  images: any[] = [];
  listImages: any[] = [];
  imagesUpdated: any[] = [];
  avatar: any;
  description: DesObject[] = [];
  brandSource: any[] = [];
  categorySource: any[] = [];
  selectedBrand!: any | null;
  selectedCategory!: any | null;

  ngOnInit() {
    this.setForm();
    this.setBrandList();
    this.setCategoryList();
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
    this.controls = this.productForm.controls;
    return this.productForm;
  }

  submit() {
    alert(`Tạo mới sản phẩm`);
    this.productForm.markAsTouched();
    if (this.productForm.valid) {
      if (this.listImages.length === 0) {
        Notiflix.Notify.failure('Cần phải tải ít nhất 1 hình ảnh');
        return;
      }
      const raws = this.productForm.getRawValue();

      if (!this.avatar) {
        Notiflix.Notify.failure('Cần chọn hình đại diện');
        return;
      }

      let des = '';
      for (let i = 0; i < this.description.length; i++) {
        if (this.description[i].value !== '') {
          if (i === 0) {
            des += `${this.description[i].key}:${this.description[i].value}`;
          } else {
            des += `*done*${this.description[i].key}:${this.description[i].value}`;
          }
        }
      }

      const data = {
        ...raws,
        description: des,
        images: this.listImages,
        mainImage: this.avatar,
      };

      console.log(`data:::`, data);
    }
  }

  setBrandList() {
    this.brandStore.dispatch(AppStore.BrandStore.BrandActions.loadBrandList());
    this.brandStore.select(AppStore.BrandStore.BrandSelectors.selectBrandList).subscribe((data) => {
      data.items.forEach((item) => {
        if (item.id) {
          this.brandSource = [...this.brandSource, { id: item.id, label: item.name }];
        }
      });
    });
  }

  setCategoryList() {
    this.categoryStore.dispatch(AppStore.CategoryStore.CategoryActions.loadCategoryList());
    this.categoryStore.select(AppStore.CategoryStore.CategorySelectors.selectCategoryList).subscribe((data) => {
      data.items.forEach((item) => {
        if (item.id) {
          this.categorySource = [...this.categorySource, { id: item.id, label: item.name }];
        }
      });
    });
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
    this.description.push({ key: `Mô Tả ${this.description.length + 1}`, value: '' });
  }

  onKey(i: number, event: any) {
    this.description[i].value = event.target.value;
  }
}
