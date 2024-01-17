import { Shop } from '@prisma/client/authn';
import { ShopModel } from '../../../domain/model/shops';
import { BaseFactory } from '../base';

export class ShopFactory extends BaseFactory {
  createShopModel(user: Shop | null) {
    if (!user) return null;

    const entity = this.createModel(ShopModel, {
      ...user,
    });

    return entity;
  }

  createShopModels(users: Shop[] | null) {
    if (!users) return null;

    return users.map((a) => this.createShopModel(a));
  }
}
