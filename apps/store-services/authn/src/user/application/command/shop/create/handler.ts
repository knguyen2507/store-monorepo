import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateShop } from '.';
import { ShopFactory } from '../../../../infrastructure/factory/shop';
import { ShopRepositoryImplement } from '../../../../infrastructure/repository/shop';

@CommandHandler(CreateShop)
export class CreateShopHandler implements ICommandHandler<CreateShop, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly shopfactory: ShopFactory;
  @Inject()
  private readonly shop: ShopRepositoryImplement;

  async execute(command: CreateShop): Promise<void> {
    const id = this.util.generateId();

    // create new shop
    const modelShop = this.shopfactory.createShopModel({
      ...command.data,
      id,
    });

    await this.shop.save(modelShop);
  }
}
