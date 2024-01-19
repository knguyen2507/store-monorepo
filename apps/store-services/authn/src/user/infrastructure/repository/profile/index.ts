import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { ProfileModel } from '../../../domain/model/profiles';
import { ProfileRepository } from '../../../domain/repository/profile';
import { ProfileFactory } from '../../factory/profile';

export class ProfileRepositoryImplement implements ProfileRepository {
  @Inject()
  private readonly factory: ProfileFactory;
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async save(data: ProfileModel): Promise<ProfileModel> {
    const saved = await this.prisma.profiles.create({
      data,
    });
    return this.factory.createProfileModel(saved);
  }

  async getById(id: string): Promise<ProfileModel> {
    const profile = await this.prisma.profiles.findUnique({
      where: { id },
    });
    return this.factory.createProfileModel(profile);
  }

  async getByRoleId(id: string): Promise<ProfileModel[]> {
    const profiles = await this.prisma.profiles.findMany({
      where: { roleId: { equals: id } },
    });
    return this.factory.createProfileModels(profiles);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.profiles.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: ProfileModel): Promise<ProfileModel> {
    const { id, ...model } = data;
    const updated = await this.prisma.profiles.update({
      data: model,
      where: { id },
    });
    return this.factory.createProfileModel(updated);
  }

  async updateUserId(userId: string, data: ProfileModel[]): Promise<void> {
    const operations: any[] = [];
    for (const item of data) {
      const profile = { ...item, userId };
      const { id, ...model } = profile;
      operations.push(
        this.prisma.profiles.update({
          data: model,
          where: { id },
        })
      );
    }
    await Promise.all(operations);
  }
}
