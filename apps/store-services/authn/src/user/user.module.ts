import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { RmqModule } from '@store-monorepo/service/rabbitmq';
import { CreateRoleHandler } from './application/command/role/create/handler';
import { CreateShopHandler } from './application/command/shop/create/handler';
import { UpdateShopHandler } from './application/command/shop/update/handler';
import { CreateUserHandler } from './application/command/user/create/handler';
import { LoginHandler } from './application/command/user/login/handler';
import { LogoutHandler } from './application/command/user/logout/handler';
import { UpdatePasswordHandler } from './application/command/user/update/password/handler';
import { FindRoleByIdHandler } from './application/query/role/detail/handler';
import { FindRoleHandler } from './application/query/role/find/handler';
import { FindShopByIdHandler } from './application/query/shop/detail/handler';
import { FindShopHandler } from './application/query/shop/find/handler';
import { FindUserByIdHandler } from './application/query/user/detail/handler';
import { FindUserHandler } from './application/query/user/find/handler';
import { GetTotalUserHandler } from './application/query/user/get-total/handler';
import { VerifyAccessTokenHandler } from './application/query/user/verify-token/handler';
import { PermissionFactory } from './infrastructure/factory/permission';
import { ProfileFactory } from './infrastructure/factory/profile';
import { RoleFactory } from './infrastructure/factory/role';
import { ShopFactory } from './infrastructure/factory/shop';
import { UserFactory } from './infrastructure/factory/user';
import { PermissionQueryImplement } from './infrastructure/query/permission';
import { ProfileQueryImplement } from './infrastructure/query/profile';
import { RoleQueryImplement } from './infrastructure/query/role';
import { ShopQueryImplement } from './infrastructure/query/shop';
import { UserQueryImplement } from './infrastructure/query/user';
import { PermissionRepositoryImplement } from './infrastructure/repository/permission';
import { ProfileRepositoryImplement } from './infrastructure/repository/profile';
import { RoleRepositoryImplement } from './infrastructure/repository/role';
import { ShopRepositoryImplement } from './infrastructure/repository/shop';
import { UserRepositoryImplement } from './infrastructure/repository/user';
import { RoleCommandController } from './presentation/role/command.controller';
import { RoleQueryController } from './presentation/role/query.controller';
import { ShopCommandController } from './presentation/shop/command.controller';
import { ShopQueryController } from './presentation/shop/query.controller';
import { UserCommandController } from './presentation/user/command.controller';
import { UserQueryController } from './presentation/user/query.controller';

const infrastructure = [
  UserQueryImplement,
  UserRepositoryImplement,
  RoleQueryImplement,
  RoleRepositoryImplement,
  PermissionQueryImplement,
  PermissionRepositoryImplement,
  ProfileQueryImplement,
  ProfileRepositoryImplement,
  ShopQueryImplement,
  ShopRepositoryImplement,
];

const commands = [
  CreateUserHandler,
  LoginHandler,
  UpdatePasswordHandler,
  LogoutHandler,
  CreateRoleHandler,
  CreateShopHandler,
  UpdateShopHandler,
];

const queries = [
  FindUserByIdHandler,
  FindUserHandler,
  GetTotalUserHandler,
  VerifyAccessTokenHandler,
  FindShopHandler,
  FindShopByIdHandler,
  FindRoleHandler,
  FindRoleByIdHandler,
];

const domain = [
  UserFactory,
  RoleFactory,
  ShopFactory,
  ProfileFactory,
  PermissionFactory,
];

const controllers = [
  UserQueryController,
  UserCommandController,
  ShopQueryController,
  ShopCommandController,
  RoleQueryController,
  RoleCommandController,
];

@Module({
  imports: [CqrsModule, AuthnPrismaModule, RmqModule],
  controllers: controllers,
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class UserModule {}
