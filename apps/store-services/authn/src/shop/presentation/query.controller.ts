import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindUserRequestDTO,
  RequestWithUser,
  UtilityImplement,
  pathPrefixQueryUser,
  pathPrefixUser,
} from '@store-monorepo/utility';
import { FindUserById } from '../application/query/user/detail';
import { FindUser } from '../application/query/user/find';
import { GetTotalUser } from '../application/query/user/get-total';
import { VerifyAccessToken } from '../application/query/user/verify-token';

@ApiTags(pathPrefixUser.swagger)
@Controller(pathPrefixUser.controller)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryUser.findUsers)
  async FindUsers(@Query() query: FindUserRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const user = new FindUser(msg);
    return await this.queryBus.execute(user);
  }

  @Get(pathPrefixQueryUser.findUserById)
  async FindUserById(@Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: { id: request.user.id },
    };
    const query = new FindUserById(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryUser.getTotalUser)
  async GetTotalUser(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalUser(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryUser.verifyAccessToken)
  async VerifyAccessToken(@Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: { user: request.user, accessToken: request.token },
    };
    const query = new VerifyAccessToken(msg);
    return await this.queryBus.execute(query);
  }
}
