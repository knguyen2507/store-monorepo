import { Module } from '@nestjs/common';
import { GuardModule } from '@store-monorepo/service/guard';
import { RmqModule } from '@store-monorepo/service/rabbitmq';
import { UserModule } from './authentication/user/user.module';
import { BrandModule } from './property/brand/brand.module';
import { CategoryModule } from './property/category/category.module';
import { ProductModule } from './property/product/product.module';

@Module({
  imports: [
    GuardModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    UserModule,
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
