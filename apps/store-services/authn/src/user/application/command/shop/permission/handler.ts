import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ShopPermission } from '.';
import { ShopModel } from '../../../../domain/model/shops';
import { ShopRepositoryImplement } from '../../../../infrastructure/repository/shop';

@CommandHandler(ShopPermission)
export class ShopPermissionHandler
  implements ICommandHandler<ShopPermission, any>
{
  @Inject()
  private readonly shop: ShopRepositoryImplement;

  async execute(command: ShopPermission): Promise<any> {
    const { user, id } = command.data;
    let shops: ShopModel[] = [];

    if (user.isSuperAdmin) {
      shops = await this.shop.getAll();
    } else {
      shops = await this.shop.getByRoleId(user.roleId);
    }

    const ids = shops.map((item) => item.id);

    if (id === null) {
      return {
        data: ids,
        permission: true,
      };
    }

    const permission =
      shops.filter((item) => {
        item.id === id;
      }).length > 0;

    return {
      data: ids,
      permission,
    };
  }
}
