import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { RoleModel } from '../../../domain/model/roles';
import { RoleRepository } from '../../../domain/repository/role';
import { RoleFactory } from '../../factory/role';

export class RoleRepositoryImplement implements RoleRepository {
  @Inject()
  private readonly factory: RoleFactory;
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async save(data: RoleModel): Promise<RoleModel> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permission, user, ...role } = data;
    const saved = await this.prisma.role.create({
      data: role,
    });
    return this.factory.createRoleModel(saved);
  }

  async getById(id: string): Promise<RoleModel> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    return this.factory.createRoleModel(user);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.users.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: RoleModel): Promise<RoleModel> {
    const { id, permission, user, ...model } = data;
    const permissionIds = permission.map((p) => {
      return { id: p.id };
    });
    const userIds = user.map((u) => {
      return { id: u.id };
    });
    const updated = await this.prisma.role.update({
      data: {
        ...model,
        permission: { connect: permissionIds },
        user: { connect: userIds },
      },
      where: { id },
    });
    return this.factory.createRoleModel(updated);
  }
}
