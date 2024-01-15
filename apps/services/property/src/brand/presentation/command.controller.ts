import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { CreateBrand } from '../application/command/brand/create';

@Controller('brand')
export class BrandCommandController {
  constructor(readonly commandBus: CommandBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_CMD_BRAND_CREATE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_CMD_BRAND_CREATE}-${environment.APPNAME}`,
  })
  async CreateBrand(msg: RmqMessage) {
    try {
      const command = new CreateBrand(msg);
      return await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
