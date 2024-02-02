import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { plainToClass } from 'class-transformer';
import { FindShopById } from '../../../application/query/shop/detail';
import { FindShopByIdResult } from '../../../application/query/shop/detail/result';
import { FindShop } from '../../../application/query/shop/find';
import { FindShopResult, FindShopResultItem } from '../../../application/query/shop/find/result';
import { GetShopInfo } from '../../../application/query/shop/get-info';
import { GetShopInfoResult } from '../../../application/query/shop/get-info/result';
import { ShopQuery } from '../../../domain/query/shop';

export class ShopQueryImplement implements ShopQuery {
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async find(query: FindShop): Promise<FindShopResult> {
    const conditions = [{ id: { in: query.data.ids } }];
    const [shops, total] = await Promise.all([
      this.prisma.shops.findMany({
        where: { AND: conditions },
        orderBy: [
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.shops.count({ where: { AND: conditions } }),
    ]);

    return {
      items: shops.map((i) => {
        return plainToClass(FindShopResultItem, i, {
          excludeExtraneousValues: true,
        });
      }),
      total,
    };
  }

  async findById(query: FindShopById): Promise<FindShopByIdResult> {
    const shop = await this.prisma.shops.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindShopByIdResult, shop, {
      excludeExtraneousValues: true,
    });
  }

  async findByIds(query: GetShopInfo): Promise<GetShopInfoResult> {
    const shops = await this.prisma.shops.findMany({
      where: { id: { in: query.data.ids } },
    });

    const items = shops.map((item) => {
      return plainToClass(FindShopResultItem, item, {
        excludeExtraneousValues: true,
      });
    });

    return { items };
  }
}
