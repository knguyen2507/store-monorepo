import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DesObject, GeneralStatusEnum } from '@store-monorepo/template/shared';
import * as AppStore from '@store-monorepo/template/store';
import * as Notiflix from 'notiflix';

interface IShopForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  address: FormControl<string | null>;
  qty: FormControl<number | null>;
}

interface IProductForm {
  id: FormControl<string | null>;
  productCode: FormControl<string | null>;
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  shop: FormArray<FormGroup<IShopForm>>;
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
  dataShopSource: Partial<AppStore.ProductStore.ShopModel>[] = [];
  shopData: Partial<AppStore.ProductStore.ShopModel>[] = [];
  shopData1: Partial<AppStore.ProductStore.ShopModel>[] = [];
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
      shop: this.fb.array<FormGroup<IShopForm>>([this.buildShop()]),
      thumbnailLink: new FormControl(null),
      category: new FormControl(null),
      brand: new FormControl(null),
      description: new FormControl(null),
      status: new FormControl(null),
    });
    this.controls = this.productForm.controls;
    return this.productForm;
  }

  buildShop(): FormGroup<IShopForm> {
    return this.fb.group<IShopForm>({
      id: new FormControl(null),
      name: new FormControl(null),
      address: new FormControl(null),
      qty: new FormControl(null),
    });
  }

  get shopFormArray(): FormArray<FormGroup<IShopForm>> {
    return this.productForm.get('shop') as FormArray;
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
      let items: any[] = [];
      let total: number = 0;
      let shop: AppStore.ProductStore.ShopModel[] = [];
      data.items.forEach((item) => {
        if (item.id) {
          total += 1;
          items = [...items, { id: item.id, label: item.name }];
          shop = [...shop, { id: item.id, name: item.name, address: item.address, qty: 0 }];
        }
      });
      this.numShop = total;
      this.shopSource = items;
      this.dataShopSource = shop;
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
      this.shopFormArray.push(this.buildShop());
      this.shopData = [...this.shopData, { id: null, name: null, address: null, qty: 0 }];
      this.shopData1 = [...this.shopData1, { id: null, name: null, address: null, qty: 0 }];
    }
  }

  onKey(i: number, event: any) {
    this.description[i].value = event.target.value;
  }

  onKeyQty(i: number, event: any) {
    this.shopData[i].qty = Number(event.target.value);
  }

  shopChange(selectedShop: any, i: number) {
    if (selectedShop) {
      const data = this.dataShopSource.find((shop) => shop.id === selectedShop.id);
      if (this.shopData[i].id && this.shopData[i].address === null) {
        this.getShopData(i, data);
      } else {
        if (this.shopData1[i].id !== selectedShop.id) {
          this.shopSource = [...this.shopSource, { id: this.shopData1[i].id, label: this.shopData1[i].name }];
          this.getShopData(i, data);
        }
      }
    } else {
      this.shopSource = [...this.shopSource, { id: this.shopData1[i].id, label: this.shopData1[i].name }];
      this.getShopData(i);
    }
  }

  reset() {
    this.numShop = 0;
    this.shopStore.dispatch(AppStore.ShopStore.ShopActions.resetShopList());
  }

  getShopData(i: number, item?: Partial<AppStore.ShopStore.ShopModel>) {
    if (item) {
      this.shopData[i].id = item.id;
      this.shopData[i].name = item.name;
      this.shopData[i].address = item.address;
      this.shopData1[i].id = item.id;
      this.shopData1[i].name = item.name;
      this.shopData1[i].address = item.address;
    } else {
      this.shopData[i].id = null;
      this.shopData[i].name = null;
      this.shopData[i].address = null;
      this.shopData1[i].id = null;
      this.shopData1[i].name = null;
      this.shopData1[i].address = null;
    }

    this.shopSource = this.shopSource.filter((shop) => shop.id !== this.shopData[i].id);
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

      const shop = [];
      for (const item of this.shopData) {
        if (item.id) shop.push({ id: item.id, qty: item.qty ? item.qty : 0 });
      }

      const data = {
        ...raws,
        description: des,
        images: this.listImages,
        mainImage: this.avatar,
        shop,
      };

      console.log(`data:::`, data);
    }
  }
}
