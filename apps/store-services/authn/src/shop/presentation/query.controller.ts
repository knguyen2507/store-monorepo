import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindShopByIdRequestDTO,
  UtilityImplement,
  pathPrefixQueryShop,
  pathPrefixShop,
} from '@store-monorepo/utility';
import { FindShopById } from '../application/query/shop/detail';
import { FindShop } from '../application/query/shop/find';

@ApiTags(pathPrefixShop.swagger)
@Controller(pathPrefixShop.controller)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ShopQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryShop.findShops)
  async FindShops(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new FindShop(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryShop.findShopById)
  async FindShopById(@Query() query: FindShopByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const shop = new FindShopById(msg);
    return await this.queryBus.execute(shop);
  }
}
