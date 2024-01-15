import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  CreateUserRequestDTO,
  LoginRequestDTO,
  RMQ,
  RequestWithUser,
  RmqMessage,
  UpdatePasswordRequestDTO,
  UtilityImplement,
  pathPrefixCommandUser,
  pathPrefixUser,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixUser.swagger)
@Controller(pathPrefixUser.controller)
export class UserCommandController {
  constructor(
    private readonly util: UtilityImplement,
    private readonly amqpService: AmqpConnection
  ) {}

  @Post(pathPrefixCommandUser.createUser)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async CreateUser(@Body() body: CreateUserRequestDTO): Promise<void> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: body,
    };
    await this.amqpService.publish(
      RMQ.EXCHANGE,
      RMQ.RK_AUTHENTICATION_CMD_USER_CREATE,
      payload
    );
  }

  @HttpCode(200)
  @Post(pathPrefixCommandUser.login)
  async Login(@Body() body: LoginRequestDTO): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: body,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_LOGIN,
      payload,
      timeout: 10000,
    });
  }

  @Post(pathPrefixCommandUser.updatePassword)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async UpdatePassword(
    @Body() body: UpdatePasswordRequestDTO,
    @Res() res: RequestWithUser
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: { ...body, id: res.user.id },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_UPDATE_PASSWORD,
      payload,
      timeout: 10000,
    });
  }

  @Post(pathPrefixCommandUser.logout)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async Logout(@Req() request: RequestWithUser): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: {
        token: request.token,
      },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_LOGOUT,
      payload,
      timeout: 10000,
    });
  }
}
