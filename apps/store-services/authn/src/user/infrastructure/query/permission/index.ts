import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { plainToClass } from 'class-transformer';
import { FindPermissionById } from '../../../application/query/permission/detail';
import { FindPermissionByIdResult } from '../../../application/query/permission/detail/result';
import {
  FindPermissionResult,
  FindPermissionResultItem,
} from '../../../application/query/permission/find/result';
import { PermissionQuery } from '../../../domain/query/permission';

export class PermissionQueryImplement implements PermissionQuery {
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async find(): Promise<FindPermissionResult> {
    const permissions = await this.prisma.permissions.findMany({
      include: { shop: true },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });

    const items = permissions.map((i) => {
      return plainToClass(
        FindPermissionResultItem,
        {
          id: i.id,
          name: i.name,
          status: i.status,
          action: i.action,
          shopId: i.shopId,
          shopName: i.shop.name,
        },
        {
          excludeExtraneousValues: true,
        }
      );
    });

    return {
      items,
      total: 0,
    };
  }

  async findById(query: FindPermissionById): Promise<FindPermissionByIdResult> {
    const shop = await this.prisma.permissions.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindPermissionByIdResult, shop, {
      excludeExtraneousValues: true,
    });
  }
}
