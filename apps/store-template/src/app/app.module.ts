import { NgModule } from '@angular/core';
import { SharedModule } from '@store-monorepo/template/shared';
import { AppStoreModule } from '@store-monorepo/template/store';
import { AdminBrandModule } from './admin/brand/brand.module';
import { AdminCategoryModule } from './admin/category/category.module';
import { AdminHomeModule } from './admin/home/home.module';
import { AdminProductModule } from './admin/product/product.module';
import { AdminUserModule } from './admin/user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { NavigationComponent } from './navigation/navigation.component';
import { BrandModule } from './shop/brand/brand.module';
import { CategoryModule } from './shop/category/category.module';
import { DetailProductModule } from './shop/detail-product/detail-product.module';
import { HomeModule } from './shop/home/home.module';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    AppRoutingModule,
    SharedModule,
    HomeModule,
    BrandModule,
    AppStoreModule,
    CategoryModule,
    DetailProductModule,
    LoginModule,
    AdminBrandModule,
    AdminCategoryModule,
    AdminProductModule,
    AdminUserModule,
    AdminHomeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
