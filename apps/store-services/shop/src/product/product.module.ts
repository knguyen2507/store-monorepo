import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from '@store-monorepo/service/cloudinary';
import { ShopPrismaModule } from '@store-monorepo/service/prisma';
import { RedisModule } from '@store-monorepo/service/redis';
import { CreateProductHandler } from './application/command/product/create/handler';
import { DeleteProductHandler } from './application/command/product/delete/handler';
import { FindProductByCodeHandler } from './application/query/product/detail/handler';
import { FindShopByProductHandler } from './application/query/product/detial-shop/handler';
import { FindProductByAdminHandler } from './application/query/product/find-by-admin/handler';
import { FindProductByBrandHandler } from './application/query/product/find-by-brand/handler';
import { FindProductByCategoryHandler } from './application/query/product/find-by-category/handler';
import { FindProductByIdHandler } from './application/query/product/find-by-id/handler';
import { FindProductByIdsHandler } from './application/query/product/find-by-ids/handler';
import { FindProductSimilarHandler } from './application/query/product/find-similar/handler';
import { FindProductHandler } from './application/query/product/find/handler';
import { GetShopByProductHandler } from './application/query/product/get-shop/handler';
import { GetTotalProductHandler } from './application/query/product/get-total/handler';
import { ProductFactory } from './infrastructure/factory/product';
import { ProductQueryImplement } from './infrastructure/query';
import { ProductRepositoryImplement } from './infrastructure/repository';
import { ProductCommandController } from './presentation/command.controller';
import { ProductQueryController } from './presentation/query.controller';

const infrastructure = [ProductQueryImplement, ProductRepositoryImplement];

const commands = [CreateProductHandler, DeleteProductHandler];

const queries = [
  FindProductByCodeHandler,
  FindProductHandler,
  FindProductByBrandHandler,
  FindProductByCategoryHandler,
  GetTotalProductHandler,
  FindProductByAdminHandler,
  FindProductByIdsHandler,
  FindProductSimilarHandler,
  FindProductByIdHandler,
  GetShopByProductHandler,
  FindShopByProductHandler,
];

const domain = [ProductFactory];

@Module({
  imports: [CqrsModule, ShopPrismaModule, CloudinaryModule, RedisModule],
  controllers: [ProductQueryController, ProductCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class ProductModule {}
