import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { RoleModel } from '../../domain/model/roles';
import { RoleRepository } from '../../domain/repository';
import { RoleFactory } from '../factory/role';

export class RoleRepositoryImplement implements RoleRepository {
  @Inject()
  private readonly factory: RoleFactory;
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async save(data: RoleModel): Promise<RoleModel> {
    const saved = await this.prisma.roles.create({
      data,
    });
    return this.factory.createRoleModel(saved);
  }

  async getById(id: string): Promise<RoleModel> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    });
    return this.factory.createRoleModel(role);
  }

  async getByUserId(id: string): Promise<RoleModel> {
    const role = await this.prisma.roles.findFirst({
      where: { profile: { some: { userId: { equals: id } } } },
    });
    return this.factory.createRoleModel(role);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.roles.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: RoleModel): Promise<RoleModel> {
    const { id, ...model } = data;
    const updated = await this.prisma.roles.update({
      data: model,
      where: { id },
    });
    return this.factory.createRoleModel(updated);
  }
}
