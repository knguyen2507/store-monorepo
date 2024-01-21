import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActionEnum, StatusEnum } from '@prisma/client/authn';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateShop } from '.';
import { PermissionFactory } from '../../../../infrastructure/factory/permission';
import { ShopFactory } from '../../../../infrastructure/factory/shop';
import { PermissionRepositoryImplement } from '../../../../infrastructure/repository/permission';
import { RoleRepositoryImplement } from '../../../../infrastructure/repository/role';
import { ShopRepositoryImplement } from '../../../../infrastructure/repository/shop';

@CommandHandler(CreateShop)
export class CreateShopHandler implements ICommandHandler<CreateShop, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly shopfactory: ShopFactory;
  @Inject()
  private readonly permissionFactory: PermissionFactory;
  @Inject()
  private readonly shop: ShopRepositoryImplement;
  @Inject()
  private readonly permission: PermissionRepositoryImplement;
  @Inject()
  private readonly role: RoleRepositoryImplement;

  async execute(command: CreateShop): Promise<void> {
    const [id, id1, id2, id3, id4] = [
      this.util.generateId(),
      this.util.generateId(),
      this.util.generateId(),
      this.util.generateId(),
      this.util.generateId(),
    ];
    // get roles are Super Admin
    const roles = await this.role.getSuperAdmin();
    const roleId = roles.map((role) => role.id);

    // create new shop
    const modelShop = this.shopfactory.createShopModel({
      ...command.data,
      id,
    });

    // create permissions for new shop
    const [
      modelCreatePermission,
      modelUpdatePermission,
      modelReadPermission,
      modelDeletePermission,
    ] = [
      this.permissionFactory.createPermissionModel({
        id: id1,
        name: `${command.data.name} Create Permission`,
        action: ActionEnum.CREATE,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: roleId, // set permission to Super Admin
      }),
      this.permissionFactory.createPermissionModel({
        id: id2,
        name: `${command.data.name} Update Permission`,
        action: ActionEnum.UPDATE,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: roleId, // set permission to Super Admin
      }),
      this.permissionFactory.createPermissionModel({
        id: id3,
        name: `${command.data.name} Read Permission`,
        action: ActionEnum.READ,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: roleId, // set permission to Super Admin
      }),
      this.permissionFactory.createPermissionModel({
        id: id4,
        name: `${command.data.name} Delete Permission`,
        action: ActionEnum.DELETE,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: roleId, // set permission to Super Admin
      }),
    ];

    await this.shop.save(modelShop);
    await Promise.all([
      this.permission.save(modelCreatePermission),
      this.permission.save(modelUpdatePermission),
      this.permission.save(modelReadPermission),
      this.permission.save(modelDeletePermission),
    ]);
  }
}
