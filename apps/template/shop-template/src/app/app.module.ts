import { NgModule } from '@angular/core';
import { SharedModule } from '@store-monorepo/template/shared';
import { AppStoreModule } from '@store-monorepo/template/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { DetailProductModule } from './detail-product/detail-product.module';
import { HomeModule } from './home/home.module';
import { NavigationComponent } from './navigation/navigation.component';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
