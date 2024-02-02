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
    private shopStore: Store<AppStore.ShopStore.ShopReducers.ShopState>,
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
  shopSource: any[] = [];
  shopData: Partial<AppStore.ProductStore.ShopModel>[] = [];
  numShop: number = 0;

  ngOnInit() {
    this.setForm();
    this.setBrandList();
    this.setCategoryList();
    this.setShopList();
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
        shop: this.shopData,
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

  setShopList() {
    this.shopStore.dispatch(AppStore.ShopStore.ShopActions.loadShopList());
    this.shopStore.select(AppStore.ShopStore.ShopSelectors.selectShopList).subscribe((data) => {
      data.items.forEach((item) => {
        if (item.id) {
          this.numShop += 1;
          this.shopSource = [...this.shopSource, { id: item.id, label: item.name }];
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

  add_shop() {
    if (this.shopData.length < this.numShop) {
      this.shopData.push({ id: null, name: null, address: null, qty: 0 });
    }
  }

  onKey(i: number, event: any) {
    this.description[i].value = event.target.value;
  }

  onKeyQty(i: number, event: any) {
    this.shopData[i].qty = Number(event.target.value);
  }

  shopChange(selectedShop: any, shopId: any, i: number) {
    if (selectedShop) {
      let address: string | null | undefined;
      let name: string | null | undefined;
      let id: string | null | undefined;
      this.shopStore.dispatch(
        AppStore.ShopStore.ShopActions.loadShopDetail({
          id: selectedShop.id,
        }),
      );
      this.shopStore.select(AppStore.ShopStore.ShopSelectors.selectShopDetail).subscribe((data) => {
        id = data.itemDetail.id;
        name = data.itemDetail.name;
        address = data.itemDetail.address;
      });
      setTimeout(() => {
        this.shopData[i].id = id;
        this.shopData[i].name = name;
        this.shopData[i].address = address;
      }, 1000);
      this.shopSource = this.shopSource.filter((shop) => shop.id !== selectedShop.id);
      this.shopStore.dispatch(AppStore.ShopStore.ShopActions.resetShopList());
    } else {
      this.shopSource = [...this.shopSource, { id: this.shopData[i].id, label: this.shopData[i].name }];
    }
  }

  reset() {
    this.numShop = 0;
    this.shopStore.dispatch(AppStore.ShopStore.ShopActions.resetShopList());
  }
}
