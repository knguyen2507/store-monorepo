import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { PermissionFactory } from '../user/infrastructure/factory/permission';
import { ProfileFactory } from '../user/infrastructure/factory/profile';
import { RoleFactory } from '../user/infrastructure/factory/role';
import { UserFactory } from '../user/infrastructure/factory/user';
import { PermissionRepositoryImplement } from '../user/infrastructure/repository/permission';
import { ProfileRepositoryImplement } from '../user/infrastructure/repository/profile';
import { RoleRepositoryImplement } from '../user/infrastructure/repository/role';
import { UserRepositoryImplement } from '../user/infrastructure/repository/user';
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
  ProfileRepositoryImplement,
  UserRepositoryImplement,
];

const commands = [CreateShopHandler, UpdateShopHandler];

const queries = [FindShopByIdHandler, FindShopHandler];

const domain = [
  ShopFactory,
  PermissionFactory,
  ProfileFactory,
  RoleFactory,
  UserFactory,
];

@Module({
  imports: [CqrsModule, AuthnPrismaModule],
  controllers: [ShopQueryController, ShopCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class ShopModule {}
