import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { PermissionFactory } from '../user/infrastructure/factory/permission';
import { RoleFactory } from '../user/infrastructure/factory/role';
import { PermissionRepositoryImplement } from '../user/infrastructure/repository/permission';
import { RoleRepositoryImplement } from '../user/infrastructure/repository/role';
import { CreateShopHandler } from './application/command/shop/create/handler';
import { UpdateShopHandler } from './application/command/shop/update/handler';
import { FindShopByIdHandler } from './application/query/shop/detail/handler';
import { FindShopHandler } from './application/query/shop/find/handler';
import { ShopFactory } from './infrastructure/factory/shop';
import { ShopQueryImplement } from './infrastructure/query';
import { ShopRepositoryImplement } from './infrastructure/repository';
import { ShopCommandController } from './presentation/command.controller';
import { ShopQueryController } from './presentation/query.controller';

const infrastructure = [
  ShopQueryImplement,
  ShopRepositoryImplement,
  RoleRepositoryImplement,
  PermissionRepositoryImplement,
];

const commands = [CreateShopHandler, UpdateShopHandler];

const queries = [FindShopByIdHandler, FindShopHandler];

const domain = [ShopFactory, RoleFactory, PermissionFactory];

@Module({
  imports: [CqrsModule, AuthnPrismaModule],
  controllers: [ShopQueryController, ShopCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class ShopModule {}
