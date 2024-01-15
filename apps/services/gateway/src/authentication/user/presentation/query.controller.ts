import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindUserRequestDTO,
  RMQ,
  RequestWithUser,
  RmqMessage,
  UtilityImplement,
  pathPrefixQueryUser,
  pathPrefixUser,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixUser.swagger)
@Controller(pathPrefixUser.controller)
export class UserQueryController {
  constructor(
    private readonly util: UtilityImplement,
    private readonly amqpService: AmqpConnection
  ) {}

  @Get(pathPrefixQueryUser.findUsers)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async FindUsers(@Query() query: FindUserRequestDTO): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_QRY_FIND_USER,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryUser.findUserById)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async FindUserById(@Req() request: RequestWithUser): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: { id: request.user.id },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_QRY_FIND_DETAIL_USER,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryUser.getTotalUser)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalUser(): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: null,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_QRY_GET_TOTAL_USER,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryUser.verifyAccessToken)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async VerifyAccessToken(@Req() request: RequestWithUser): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: { user: request.user, accessToken: request.token },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_QRY_VERIFY_TOKEN,
      payload,
      timeout: 10000,
    });
  }
}
