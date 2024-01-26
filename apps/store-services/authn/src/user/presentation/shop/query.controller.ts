import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard, AuthoShopGuard } from '@store-monorepo/service/guard';
import {
  FindShopByIdRequestDTO,
  RMQ,
  RequestWithUser,
  RmqMessage,
  UtilityImplement,
  environment,
  pathPrefixQueryShop,
  pathPrefixShop,
} from '@store-monorepo/utility';
import { FindShopById } from '../../application/query/shop/detail';
import { FindShop } from '../../application/query/shop/find';
import { GetShopInfo } from '../../application/query/shop/get-info';

@ApiTags(pathPrefixShop.swagger)
@Controller(pathPrefixShop.controller)
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class ShopQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryShop.findShops)
  @UseGuards(AuthoShopGuard)
  async FindShops(@Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: { ids: request.shopIds },
    };
    const query = new FindShop(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryShop.findShopById)
  @UseGuards(AuthoShopGuard)
  async FindShopById(@Query() query: FindShopByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const shop = new FindShopById(msg);
    return await this.queryBus.execute(shop);
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_AUHTN_QRY_GET_SHOP_INFORMATION,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_AUHTN_QRY_GET_SHOP_INFORMATION}-${environment.APPNAME}`,
  })
  async GetShopInfo(msg: RmqMessage) {
    try {
      const query = new GetShopInfo(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
