import { Module } from '@nestjs/common';
import { CloudinaryModule } from '@store-monorepo/service/cloudinary';
import { GuardModule } from '@store-monorepo/service/guard';
import { PrismaModule } from '@store-monorepo/service/prisma';
import { RedisModule } from '@store-monorepo/service/redis';
import { UtilityModule } from '@store-monorepo/service/utility';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    UtilityModule,
    GuardModule,
    RedisModule,
    BrandModule,
    CloudinaryModule,
    CategoryModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
