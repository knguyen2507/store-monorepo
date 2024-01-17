import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { plainToClass } from 'class-transformer';
import { FindShopById } from '../../application/query/shop/detail';
import { FindShopByIdResult } from '../../application/query/shop/detail/result';
import {
  FindShopResult,
  FindShopResultItem,
} from '../../application/query/shop/find/result';
import { ShopQuery } from '../../domain/query';

export class ShopQueryImplement implements ShopQuery {
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async find(): Promise<FindShopResult> {
    const [shops, total] = await Promise.all([
      this.prisma.shop.findMany({
        orderBy: [
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.users.count(),
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
    const shop = await this.prisma.shop.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindShopByIdResult, shop, {
      excludeExtraneousValues: true,
    });
  }
}
