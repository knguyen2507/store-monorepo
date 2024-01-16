import { Inject } from '@nestjs/common';
import { ShopPrismaService } from '@store-monorepo/service/prisma';
import { ProductModel } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repository';
import { ProductFactory } from '../factory/product';

export class ProductRepositoryImplement implements ProductRepository {
  @Inject()
  private readonly factory: ProductFactory;
  @Inject()
  private readonly prisma: ShopPrismaService;

  async save(data: ProductModel): Promise<ProductModel> {
    const saved = await this.prisma.products.create({ data });
    return this.factory.createProductModel(saved);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.products.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: ProductModel): Promise<ProductModel> {
    const { id, ...saveData } = data;
    const saved = await this.prisma.products.update({
      where: { id },
      data: saveData,
    });
    return this.factory.createProductModel(saved);
  }

  async getById(id: string): Promise<ProductModel> {
    const product = await this.prisma.products.findUnique({ where: { id } });
    return this.factory.createProductModel(product);
  }

  async getByIds(id: string | string[]): Promise<ProductModel[]> {
    const data = Array.isArray(id) ? id : [id];
    const products = await this.prisma.products.findMany({
      where: { id: { in: data } },
    });
    return this.factory.createProductModels(products);
  }
}
