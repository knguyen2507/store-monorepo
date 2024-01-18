import { Shops } from '@prisma/client/authn';
import { ShopModel } from '../../../domain/model/shops';
import { BaseFactory } from '../base';

export class ShopFactory extends BaseFactory {
  createShopModel(user: Shops | null) {
    if (!user) return null;

    const entity = this.createModel(ShopModel, {
      ...user,
    });

    return entity;
  }

  createShopModels(users: Shops[] | null) {
    if (!users) return null;

    return users.map((a) => this.createShopModel(a));
  }
}
