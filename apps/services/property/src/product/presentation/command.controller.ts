import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { CreateProduct } from '../application/command/product/create';
import { DeleteProduct } from '../application/command/product/delete';

@Controller('product')
export class ProductCommandController {
  constructor(readonly commandBus: CommandBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_CMD_PRODUCT_CREATE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_CMD_PRODUCT_CREATE}-${environment.APPNAME}`,
  })
  async CreateProduct(msg: RmqMessage) {
    try {
      const command = new CreateProduct(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_CMD_PRODUCT_DELETE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_CMD_PRODUCT_DELETE}-${environment.APPNAME}`,
  })
  async DeleteProduct(msg: RmqMessage) {
    try {
      const command = new DeleteProduct(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
