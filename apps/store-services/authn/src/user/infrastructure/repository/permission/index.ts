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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, shop, ...user } = data;
    const saved = await this.prisma.permission.create({
      data: user,
    });
    return this.factory.createPermissionModel(saved);
  }

  async getById(id: string): Promise<PermissionModel> {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    return this.factory.createPermissionModel(permission);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.permission.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: PermissionModel): Promise<PermissionModel> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, role, shop, ...model } = data;
    const updated = await this.prisma.permission.update({
      data: model,
      where: { id },
    });
    return this.factory.createPermissionModel(updated);
  }
}
