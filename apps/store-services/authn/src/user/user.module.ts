import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CerbosModule } from '@store-monorepo/service/cerbos';
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
import { GetUserInfoHandler } from './application/query/user/get-user-info/handler';
import { VerifyAccessTokenHandler } from './application/query/user/verify-token/handler';
import { PermissionFactory } from './infrastructure/factory/permission';
import { RoleFactory } from './infrastructure/factory/role';
import { ShopFactory } from './infrastructure/factory/shop';
import { UserFactory } from './infrastructure/factory/user';
import { PermissionQueryImplement } from './infrastructure/query/permission';
import { RoleQueryImplement } from './infrastructure/query/role';
import { ShopQueryImplement } from './infrastructure/query/shop';
import { UserQueryImplement } from './infrastructure/query/user';
import { PermissionRepositoryImplement } from './infrastructure/repository/permission';
import { RoleRepositoryImplement } from './infrastructure/repository/role';
import { ShopRepositoryImplement } from './infrastructure/repository/shop';
import { UserRepositoryImplement } from './infrastructure/repository/user';
import { PolicyService } from './infrastructure/services/policy.service';
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
  ShopQueryImplement,
  ShopRepositoryImplement,
  PolicyService,
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
  GetUserInfoHandler,
];

const domain = [UserFactory, RoleFactory, ShopFactory, PermissionFactory];

const controllers = [
  UserQueryController,
  UserCommandController,
  ShopQueryController,
  ShopCommandController,
  RoleQueryController,
  RoleCommandController,
];

@Module({
  imports: [CqrsModule, AuthnPrismaModule, RmqModule, CerbosModule],
  controllers: controllers,
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class UserModule {}
