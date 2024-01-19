import { Inject, Injectable } from '@nestjs/common';
import { ShopPrismaService } from '@store-monorepo/service/prisma';
import {
  InitialBrand,
  InitialCategory,
  UtilityImplement,
} from '@store-monorepo/utility';

@Injectable()
export class SeedShopService {
  constructor(
    @Inject(ShopPrismaService) private prisma: ShopPrismaService,
    private readonly util: UtilityImplement
  ) {}

  seed = async () => {
    let operations: any[] = [];

    const [brands, categories] = await Promise.all([
      this.prisma.brands.findMany(),
      this.prisma.categories.findMany(),
    ]);

    if (brands.length === 0) {
      for (const brand of InitialBrand) {
        operations = [
          ...operations,
          this.prisma.brands.create({
            data: brand,
          }),
        ];
      }
    }

    if (categories.length === 0) {
      for (const categories of InitialCategory) {
        operations = [
          ...operations,
          this.prisma.categories.create({
            data: categories,
          }),
        ];
      }
    }

    await this.prisma.$transaction(operations);
  };
}
