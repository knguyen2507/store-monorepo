import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { FindUserById } from '../application/query/user/detail';
import { FindUser } from '../application/query/user/find';
import { GetTotalUser } from '../application/query/user/get-total';
import { VerifyAccessToken } from '../application/query/user/verify-token';

@Controller('user')
export class UserQueryController {
  constructor(readonly queryBus: QueryBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_LOGIN,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_CMD_USER_LOGIN}-${environment.APPNAME}`,
  })
  async FindUsers(msg: RmqMessage) {
    try {
      const query = new FindUser(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_QRY_FIND_DETAIL_USER,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_QRY_FIND_DETAIL_USER}-${environment.APPNAME}`,
  })
  async FindUserById(msg: RmqMessage) {
    try {
      const query = new FindUserById(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_QRY_GET_TOTAL_USER,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_QRY_GET_TOTAL_USER}-${environment.APPNAME}`,
  })
  async GetTotalUser(msg: RmqMessage) {
    try {
      const query = new GetTotalUser(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_QRY_VERIFY_TOKEN,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_QRY_VERIFY_TOKEN}-${environment.APPNAME}`,
  })
  async VerifyAccessToken(msg: RmqMessage) {
    try {
      const query = new VerifyAccessToken(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
