import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActionEnum, StatusEnum } from '@prisma/client/authn';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateShop } from '.';
import { PermissionFactory } from '../../../../infrastructure/factory/permission';
import { ProfileFactory } from '../../../../infrastructure/factory/profile';
import { ShopFactory } from '../../../../infrastructure/factory/shop';
import { PermissionRepositoryImplement } from '../../../../infrastructure/repository/permission';
import { ProfileRepositoryImplement } from '../../../../infrastructure/repository/profile';
import { RoleRepositoryImplement } from '../../../../infrastructure/repository/role';
import { ShopRepositoryImplement } from '../../../../infrastructure/repository/shop';
import { UserRepositoryImplement } from '../../../../infrastructure/repository/user';

@CommandHandler(CreateShop)
export class CreateShopHandler implements ICommandHandler<CreateShop, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly shopfactory: ShopFactory;
  @Inject()
  private readonly permissionFactory: PermissionFactory;
  @Inject()
  private readonly profileFactory: ProfileFactory;
  @Inject()
  private readonly shop: ShopRepositoryImplement;
  @Inject()
  private readonly permission: PermissionRepositoryImplement;
  @Inject()
  private readonly user: UserRepositoryImplement;
  @Inject()
  private readonly role: RoleRepositoryImplement;
  @Inject()
  private readonly profile: ProfileRepositoryImplement;

  async execute(command: CreateShop): Promise<void> {
    const [id, id1, id2, id3, id4] = [
      this.util.generateId(),
      this.util.generateId(),
      this.util.generateId(),
      this.util.generateId(),
      this.util.generateId(),
    ];

    const modelShop = this.shopfactory.createShopModel({
      ...command.data,
      id,
    });

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
      }),
      this.permissionFactory.createPermissionModel({
        id: id2,
        name: `${command.data.name} Update Permission`,
        action: ActionEnum.UPDATE,
        status: StatusEnum.ACTIVE,
        shopId: id,
      }),
      this.permissionFactory.createPermissionModel({
        id: id3,
        name: `${command.data.name} Read Permission`,
        action: ActionEnum.READ,
        status: StatusEnum.ACTIVE,
        shopId: id,
      }),
      this.permissionFactory.createPermissionModel({
        id: id4,
        name: `${command.data.name} Delete Permission`,
        action: ActionEnum.DELETE,
        status: StatusEnum.ACTIVE,
        shopId: id,
      }),
    ];

    const roles = await this.role.getSuperAdmin();
    const operations: any[] = [];

    for (const role of roles) {
      const users = await this.user.getByRoleId(role.id);
      for (const user of users) {
        const [profile1, profile2, profile3, profile4] = [
          this.profileFactory.createProfileModel({
            id: this.util.generateId(),
            userId: user.id,
            permissionId: id1,
            roleId: role.id,
          }),
          this.profileFactory.createProfileModel({
            id: this.util.generateId(),
            userId: user.id,
            permissionId: id2,
            roleId: role.id,
          }),
          this.profileFactory.createProfileModel({
            id: this.util.generateId(),
            userId: user.id,
            permissionId: id3,
            roleId: role.id,
          }),
          this.profileFactory.createProfileModel({
            id: this.util.generateId(),
            userId: user.id,
            permissionId: id4,
            roleId: role.id,
          }),
        ];
        operations.push(this.profile.save(profile1));
        operations.push(this.profile.save(profile2));
        operations.push(this.profile.save(profile3));
        operations.push(this.profile.save(profile4));
      }
    }

    await this.shop.save(modelShop);
    await Promise.all([
      this.permission.save(modelCreatePermission),
      this.permission.save(modelUpdatePermission),
      this.permission.save(modelReadPermission),
      this.permission.save(modelDeletePermission),
    ]);
    await Promise.all(operations);
  }
}
