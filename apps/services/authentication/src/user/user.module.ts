import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@store-monorepo/service/prisma';
import { CreateUserHandler } from './application/command/user/create/handler';
import { LoginHandler } from './application/command/user/login/handler';
import { LogoutHandler } from './application/command/user/logout/handler';
import { UpdatePasswordHandler } from './application/command/user/update/password/handler';
import { FindUserByIdHandler } from './application/query/user/detail/handler';
import { FindUserHandler } from './application/query/user/find/handler';
import { GetTotalUserHandler } from './application/query/user/get-total/handler';
import { VerifyAccessTokenHandler } from './application/query/user/verify-token/handler';
import { UserFactory } from './infrastructure/factory/user';
import { UserQueryImplement } from './infrastructure/query';
import { UserRepositoryImplement } from './infrastructure/repository';
import { UserCommandController } from './presentation/command.controller';
import { UserQueryController } from './presentation/query.controller';

const infrastructure = [UserQueryImplement, UserRepositoryImplement];

const commands = [
  CreateUserHandler,
  LoginHandler,
  UpdatePasswordHandler,
  LogoutHandler,
];

const queries = [
  FindUserByIdHandler,
  FindUserHandler,
  GetTotalUserHandler,
  VerifyAccessTokenHandler,
];

const domain = [UserFactory];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UserQueryController, UserCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class UserModule {}
