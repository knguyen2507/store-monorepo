import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard, AuthoShopGuard } from '@store-monorepo/service/guard';
import {
  FindShopByIdRequestDTO,
  RequestWithUser,
  UtilityImplement,
  pathPrefixQueryShop,
  pathPrefixShop,
} from '@store-monorepo/utility';
import { FindShopById } from '../../application/query/shop/detail';
import { FindShop } from '../../application/query/shop/find';

@ApiTags(pathPrefixShop.swagger)
@Controller(pathPrefixShop.controller)
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class ShopQueryController {
  constructor(private readonly util: UtilityImplement, readonly queryBus: QueryBus) {}

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
      data: { id: query.shopId },
    };
    const shop = new FindShopById(msg);
    return await this.queryBus.execute(shop);
  }
}
