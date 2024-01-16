import { Inject } from '@nestjs/common';
import { ShopPrismaService } from '@store-monorepo/service/prisma';
import { plainToClass } from 'class-transformer';
import { FindBrandById } from '../../application/query/brand/detail';
import { FindBrandByIdResult } from '../../application/query/brand/detail/result';
import { FindBrandByCode } from '../../application/query/brand/find-by-code';
import { FindBrandByCodeResult } from '../../application/query/brand/find-by-code/result';
import {
  FindBrandResult,
  FindBrandResultItem,
} from '../../application/query/brand/find/result';
import { GetTotalBrandResult } from '../../application/query/brand/get-total/result';
import { BrandQuery } from '../../domain/query';

export class BrandQueryImplement implements BrandQuery {
  @Inject()
  private readonly prisma: ShopPrismaService;

  async find(): Promise<FindBrandResult> {
    const brands = await this.prisma.brands.findMany({
      orderBy: [
        {
          created: { at: 'desc' },
        },
        {
          id: 'asc',
        },
      ],
    });

    return {
      items: brands.map((i) => {
        return plainToClass(FindBrandResultItem, i, {
          excludeExtraneousValues: true,
        });
      }),
      total: 0,
    };
  }

  async findById(query: FindBrandById): Promise<FindBrandByIdResult> {
    const brand = await this.prisma.brands.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindBrandByIdResult, brand, {
      excludeExtraneousValues: true,
    });
  }

  async findByCode(query: FindBrandByCode): Promise<FindBrandByCodeResult> {
    const brand = await this.prisma.brands.findUnique({
      where: { brandCode: query.data.code },
    });

    return plainToClass(FindBrandByCodeResult, brand, {
      excludeExtraneousValues: true,
    });
  }

  async getTotal(): Promise<GetTotalBrandResult> {
    const total = await this.prisma.brands.count();

    return plainToClass(
      GetTotalBrandResult,
      { total },
      { excludeExtraneousValues: true }
    );
  }
}
