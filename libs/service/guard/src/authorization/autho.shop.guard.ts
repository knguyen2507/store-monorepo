import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  RMQ,
  RequestWithUser,
  RmqMessage,
  UtilityImplement,
} from '@store-monorepo/utility';

@Injectable()
export class AuthoShopGuard implements CanActivate {
  constructor(
    private readonly util: UtilityImplement,
    private readonly amqpService: AmqpConnection
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: {
        user,
        id: request.body.id ? request.body.id : null,
      },
    };

    const rmqData = await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_AUTHN_CMD_SHOP_PERMISSION,
      payload,
      timeout: 10000,
    });

    request['shopIds'] = rmqData.data;

    return rmqData.permission;
  }
}
