import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard, AuthoGuard } from '@store-monorepo/service/guard';
import {
  FindUserRequestDTO,
  GuardDecorator,
  RequestWithUser,
  UtilityImplement,
  pathPrefixQueryUser,
  pathPrefixUser,
} from '@store-monorepo/utility';
import { FindUserById } from '../../application/query/user/detail';
import { FindUserByIdResult } from '../../application/query/user/detail/result';
import { FindUser } from '../../application/query/user/find';
import { FindUserResult } from '../../application/query/user/find/result';
import { GetTotalUser } from '../../application/query/user/get-total';
import { GetTotalUserResult } from '../../application/query/user/get-total/result';
import { GetUserInfo } from '../../application/query/user/get-user-info';
import { GetUserInfoResult } from '../../application/query/user/get-user-info/result';
import { VerifyAccessToken } from '../../application/query/user/verify-token';
import { VerifyAccessTokenResult } from '../../application/query/user/verify-token/result';

@ApiTags(pathPrefixUser.swagger)
@Controller(pathPrefixUser.controller)
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class UserQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryUser.findUsers)
  @GuardDecorator({ action: 'READ', resource: 'user' })
  @UseGuards(AuthoGuard)
  async FindUsers(@Query() query: FindUserRequestDTO): Promise<FindUserResult> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const user = new FindUser(msg);
    return await this.queryBus.execute(user);
  }

  @Get(pathPrefixQueryUser.findUserById)
  @GuardDecorator({ action: 'READ', resource: 'user' })
  @UseGuards(AuthoGuard)
  async FindUserById(
    @Req() request: RequestWithUser
  ): Promise<FindUserByIdResult> {
    const msg = {
      messageId: this.util.generateId(),
      data: { id: request.user.id },
    };
    const query = new FindUserById(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryUser.getTotalUser)
  @GuardDecorator({ action: 'READ', resource: 'user' })
  @UseGuards(AuthoGuard)
  async GetTotalUser(): Promise<GetTotalUserResult> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalUser(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryUser.verifyAccessToken)
  async VerifyAccessToken(
    @Req() request: RequestWithUser
  ): Promise<VerifyAccessTokenResult> {
    const msg = {
      messageId: this.util.generateId(),
      data: { user: request.user, accessToken: request.token },
    };
    const query = new VerifyAccessToken(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryUser.getUserInfo)
  @GuardDecorator({ action: 'READ', resource: 'user' })
  @UseGuards(AuthoGuard)
  async GetUserInfo(
    @Req() request: RequestWithUser
  ): Promise<GetUserInfoResult> {
    const msg = {
      messageId: this.util.generateId(),
      data: { id: request.user.id },
    };
    const query = new GetUserInfo(msg);
    return await this.queryBus.execute(query);
  }
}
