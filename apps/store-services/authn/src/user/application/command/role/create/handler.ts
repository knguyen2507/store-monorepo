import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import { CreateRole } from '.';
import { RoleFactory } from '../../../../infrastructure/factory/role';
import { RoleRepositoryImplement } from '../../../../infrastructure/repository/role';

@CommandHandler(CreateRole)
export class CreateRoleHandler implements ICommandHandler<CreateRole, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly roleFactory: RoleFactory;
  @Inject()
  private readonly role: RoleRepositoryImplement;

  async execute(command: CreateRole): Promise<void> {
    const { name, permissions, isSuperAdmin } = command.data;
    const id = this.util.generateId();

    // create new role
    const model = await this.roleFactory.createRoleModel({
      id,
      name,
      isSuperAdmin,
      permissionId: permissions,
    });

    await this.role.save(model);
  }
}
