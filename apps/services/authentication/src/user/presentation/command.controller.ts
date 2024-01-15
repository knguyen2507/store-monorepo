import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { CreateUser } from '../application/command/user/create';
import { Login } from '../application/command/user/login';
import { Logout } from '../application/command/user/logout';
import { UpdatePassword } from '../application/command/user/update/password';

@Controller('user')
export class UserCommandController {
  constructor(readonly commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_CREATE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_CMD_USER_CREATE}-${environment.APPNAME}`,
  })
  async CreateUser(msg: RmqMessage) {
    try {
      const command = new CreateUser(msg);
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_LOGIN,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_CMD_USER_LOGIN}-${environment.APPNAME}`,
  })
  async Login(msg: RmqMessage) {
    try {
      const command = new Login(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_UPDATE_PASSWORD,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_CMD_USER_UPDATE_PASSWORD}-${environment.APPNAME}`,
  })
  async UpdatePassword(msg: RmqMessage) {
    try {
      const command = new UpdatePassword(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHENTICATION_CMD_USER_LOGOUT,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHENTICATION_CMD_USER_LOGOUT}-${environment.APPNAME}`,
  })
  async Logout(msg: RmqMessage) {
    try {
      const command = new Logout(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
