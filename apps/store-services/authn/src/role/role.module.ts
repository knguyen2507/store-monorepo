import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { ShopFactory } from '../shop/infrastructure/factory/shop';
import { ShopRepositoryImplement } from '../shop/infrastructure/repository';
import { ProfileFactory } from '../user/infrastructure/factory/profile';
import { ProfileRepositoryImplement } from '../user/infrastructure/repository/profile';
import { CreateRoleHandler } from './application/command/role/create/handler';
import { RoleFactory } from './infrastructure/factory/role';
import { RoleQueryImplement } from './infrastructure/query';
import { RoleRepositoryImplement } from './infrastructure/repository';
import { RoleCommandController } from './presentation/command.controller';
import { RoleQueryController } from './presentation/query.controller';

const infrastructure = [
  RoleQueryImplement,
  RoleRepositoryImplement,
  ProfileRepositoryImplement,
  ShopRepositoryImplement,
];

const commands = [CreateRoleHandler];

const queries = [];

const domain = [RoleFactory, ProfileFactory, ShopFactory];

@Module({
  imports: [CqrsModule, AuthnPrismaModule],
  controllers: [RoleQueryController, RoleCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class RoleModule {}
