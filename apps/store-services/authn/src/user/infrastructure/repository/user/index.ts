import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { UserModel } from '../../../domain/model/users';
import { UserRepository } from '../../../domain/repository/user';
import { UserFactory } from '../../factory/user';

export class UserRepositoryImplement implements UserRepository {
  @Inject()
  private readonly factory: UserFactory;
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async save(data: UserModel): Promise<UserModel> {
    const saved = await this.prisma.users.create({
      data,
    });
    return this.factory.createUserModel(saved);
  }

  async getById(id: string): Promise<UserModel> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    return this.factory.createUserModel(user);
  }

  async getByUsername(username: string): Promise<UserModel> {
    const user = await this.prisma.users.findFirst({
      where: { username },
    });
    return this.factory.createUserModel(user);
  }

  async getByRoleId(id: string): Promise<UserModel[]> {
    const users = await this.prisma.users.findMany({
      where: { role: { id: { equals: id } } },
    });
    return this.factory.createUserModels(users);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.users.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: UserModel): Promise<UserModel> {
    const { id, ...model } = data;
    const updated = await this.prisma.users.update({
      data: model,
      where: { id },
    });
    return this.factory.createUserModel(updated);
  }
}
