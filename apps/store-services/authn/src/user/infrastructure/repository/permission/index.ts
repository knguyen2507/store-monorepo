import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { PermissionModel } from '../../../domain/model/permissions';
import { PermissionRepository } from '../../../domain/repository/permission';
import { PermissionFactory } from '../../factory/permission';

export class PermissionRepositoryImplement implements PermissionRepository {
  @Inject()
  private readonly factory: PermissionFactory;
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async save(data: PermissionModel): Promise<PermissionModel> {
    const { shopId, roleId, ...model } = data;
    const ids = roleId.map((role) => {
      return { id: role };
    });
    const saved = await this.prisma.permissions.create({
      data: {
        ...model,
        shop: { connect: { id: shopId } },
        role: { connect: ids },
      },
    });
    return this.factory.createPermissionModel(saved);
  }

  async getById(id: string): Promise<PermissionModel> {
    const permission = await this.prisma.permissions.findUnique({
      where: { id },
    });
    return this.factory.createPermissionModel(permission);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.permissions.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: PermissionModel): Promise<PermissionModel> {
    const { id, ...model } = data;
    const updated = await this.prisma.permissions.update({
      data: model,
      where: { id },
    });
    return this.factory.createPermissionModel(updated);
  }
}
