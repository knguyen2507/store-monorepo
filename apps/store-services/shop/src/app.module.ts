import { Module } from '@nestjs/common';
import { CloudinaryModule } from '@store-monorepo/service/cloudinary';
import { GuardModule } from '@store-monorepo/service/guard';
import { ShopPrismaModule } from '@store-monorepo/service/prisma';
import { RmqModule } from '@store-monorepo/service/rabbitmq';
import { RedisModule } from '@store-monorepo/service/redis';
import { UtilityModule } from '@store-monorepo/utility';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ShopPrismaModule,
    UtilityModule,
    GuardModule,
    RedisModule,
    BrandModule,
    CloudinaryModule,
    CategoryModule,
    ProductModule,
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
