import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { CreateCategory } from '../application/command/category/create';

@Controller('category')
export class CategoryCommandController {
  constructor(readonly commandBus: CommandBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_CMD_BRAND_CREATE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_CMD_BRAND_CREATE}-${environment.APPNAME}`,
  })
  async CreateCategory(msg: RmqMessage) {
    try {
      const command = new CreateCategory(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
