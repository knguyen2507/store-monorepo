import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateRole } from '.';
import { ProfileFactory } from '../../../../infrastructure/factory/profile';
import { RoleFactory } from '../../../../infrastructure/factory/role';
import { ProfileRepositoryImplement } from '../../../../infrastructure/repository/profile';
import { RoleRepositoryImplement } from '../../../../infrastructure/repository/role';

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

  async execute(command: CreateRole): Promise<void> {
    const { name, permissions, isSuperAdmin } = command.data;
    const id = this.util.generateId();
    const operations: any[] = [];

    const model = await this.roleFactory.createRoleModel({
      id,
      name,
      isSuperAdmin,
    });
    for (const permission of permissions) {
      operations.push(
        this.profile.save(
          this.profileFactory.createProfileModel({
            id: this.util.generateId(),
            permissionId: permission,
            roleId: id,
            userId: null,
          })
        )
      );
    }

    await this.role.save(model);
    await Promise.all(operations);
  }
}
