import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActionEnum, StatusEnum } from '@prisma/client/authn';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateShop } from '.';
import { PermissionFactory } from '../../../../../user/infrastructure/factory/permission';
import { RoleFactory } from '../../../../../user/infrastructure/factory/role';
import { PermissionRepositoryImplement } from '../../../../../user/infrastructure/repository/permission';
import { RoleRepositoryImplement } from '../../../../../user/infrastructure/repository/role';
import { ShopFactory } from '../../../../infrastructure/factory/shop';
import { ShopRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateShop)
export class CreateShopHandler implements ICommandHandler<CreateShop, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly shopfactory: ShopFactory;
  @Inject()
  private readonly permissionFactory: PermissionFactory;
  @Inject()
  private readonly roleFactory: RoleFactory;
  @Inject()
  private readonly shop: ShopRepositoryImplement;
  @Inject()
  private readonly permission: PermissionRepositoryImplement;
  @Inject()
  private readonly role: RoleRepositoryImplement;

  async execute(command: CreateShop): Promise<void> {
    const [id, idRole] = [this.util.generateId(), this.util.generateId()];

    const [modelShop, modelRole] = [
      this.shopfactory.createShopModel({
        ...command.data,
        id,
      }),
      this.roleFactory.createRoleModel({
        id: idRole,
        name: `Admin ${command.data.name}`,
      }),
    ];

    const [
      modelCreatePermission,
      modelUpdatePermission,
      modelReadPermission,
      modelDeletePermission,
    ] = [
      this.permissionFactory.createPermissionModel({
        id: this.util.generateId(),
        name: `${command.data.name} Create Permission`,
        action: ActionEnum.CREATE,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: idRole,
      }),
      this.permissionFactory.createPermissionModel({
        id: this.util.generateId(),
        name: `${command.data.name} Update Permission`,
        action: ActionEnum.UPDATE,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: idRole,
      }),
      this.permissionFactory.createPermissionModel({
        id: this.util.generateId(),
        name: `${command.data.name} Read Permission`,
        action: ActionEnum.READ,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: idRole,
      }),
      this.permissionFactory.createPermissionModel({
        id: this.util.generateId(),
        name: `${command.data.name} Delete Permission`,
        action: ActionEnum.DELETE,
        status: StatusEnum.ACTIVE,
        shopId: id,
        roleId: idRole,
      }),
    ];

    console.log(`modelCreatePermission:::`, modelCreatePermission);

    await Promise.all([
      await this.shop.save(modelShop),
      await this.role.save(modelRole),
    ]);
    await Promise.all([
      this.permission.save(modelCreatePermission),
      this.permission.save(modelUpdatePermission),
      this.permission.save(modelReadPermission),
      this.permission.save(modelDeletePermission),
    ]);
  }
}
