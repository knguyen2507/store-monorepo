import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateRole } from '.';
import { ShopRepositoryImplement } from '../../../../../shop/infrastructure/repository';
import { ProfileFactory } from '../../../../../user/infrastructure/factory/profile';
import { ProfileRepositoryImplement } from '../../../../../user/infrastructure/repository/profile';
import { RoleFactory } from '../../../../infrastructure/factory/role';
import { RoleRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateRole)
export class CreateRoleHandler implements ICommandHandler<CreateRole, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly roleFactory: RoleFactory;
  @Inject()
  private readonly profileFactory: ProfileFactory;
  @Inject()
  private readonly role: RoleRepositoryImplement;
  @Inject()
  private readonly profile: ProfileRepositoryImplement;
  @Inject()
  private readonly shop: ShopRepositoryImplement;

  async execute(command: CreateRole): Promise<void> {
    const { name, permissions } = command.data;
    const id = this.util.generateId();
    const operations: any[] = [];

    const model = await this.roleFactory.createRoleModel({
      id,
      name: name,
    });
    for (const permission of permissions) {
      const shop = await this.shop.getByPermissionId(permission);
      operations.push(
        this.profile.save(
          this.profileFactory.createProfileModel({
            id: this.util.generateId(),
            permissionId: permission,
            roleId: id,
            userId: null,
            shopId: shop.id,
          })
        )
      );
    }

    await this.role.save(model);
    await Promise.all(operations);
  }
}
