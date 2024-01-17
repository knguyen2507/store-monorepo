import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { ShopModel } from '../../domain/model/shops';
import { ShopRepository } from '../../domain/repository';
import { ShopFactory } from '../factory/shop';

export class ShopRepositoryImplement implements ShopRepository {
  @Inject()
  private readonly factory: ShopFactory;
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async save(data: ShopModel): Promise<ShopModel> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permission, ...model } = data;
    const saved = await this.prisma.shop.create({ data: model });
    return this.factory.createShopModel(saved);
  }

  async getById(id: string): Promise<ShopModel> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });
    return this.factory.createShopModel(shop);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.shop.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: ShopModel): Promise<ShopModel> {
    const { id, permission, ...model } = data;
    const ids = permission.map((p) => {
      return { id: p.id };
    });
    const updated = await this.prisma.shop.update({
      data: { ...model, permission: { connect: ids } },
      where: { id },
    });
    return this.factory.createShopModel(updated);
  }
}
