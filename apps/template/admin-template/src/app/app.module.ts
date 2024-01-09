import { NgModule } from '@angular/core';
import { SharedModule } from '@store-monorepo/template/shared';
import { AppStoreModule } from '@store-monorepo/template/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    LoginModule,
    AppRoutingModule,
    SharedModule,
    AppStoreModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    UserModule,
    HomeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
