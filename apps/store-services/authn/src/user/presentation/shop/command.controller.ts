import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from '@store-monorepo/service/guard';
import {
  CreateShopRequestDTO,
  RMQ,
  RmqMessage,
  UpdateShopRequestDTO,
  UtilityImplement,
  environment,
  pathPrefixCommandShop,
  pathPrefixShop,
} from '@store-monorepo/utility';
import { CreateShop } from '../../application/command/shop/create';
import { ShopPermission } from '../../application/command/shop/permission';
import { UpdateShop } from '../../application/command/shop/update';

@ApiTags(pathPrefixShop.swagger)
@Controller(pathPrefixShop.controller)
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class ShopCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post(pathPrefixCommandShop.createShop)
  async CreateShop(@Body() body: CreateShopRequestDTO): Promise<void> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new CreateShop(msg);
    await this.commandBus.execute(command);
  }

  @Post(pathPrefixCommandShop.updateShop)
  async UpdateShop(@Body() body: UpdateShopRequestDTO): Promise<void> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new UpdateShop(msg);
    await this.commandBus.execute(command);
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUTHN_CMD_SHOP_PERMISSION,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUTHN_CMD_SHOP_PERMISSION}-${environment.APPNAME}`,
  })
  async GetShopInfo(msg: RmqMessage) {
    try {
      const query = new ShopPermission(msg);
      return await this.commandBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
