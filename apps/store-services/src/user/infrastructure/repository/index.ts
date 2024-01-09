import { Inject } from '@nestjs/common';
import { PrismaService } from '@store-monorepo/service/prisma';
import { UserModel } from '../../domain/model/users';
import { UserRepository } from '../../domain/repository';
import { UserFactory } from '../factory/user';

export class UserRepositoryImplement implements UserRepository {
  @Inject()
  private readonly factory: UserFactory;
  @Inject()
  private readonly prisma: PrismaService;

  async save(data: UserModel): Promise<UserModel> {
    const saved = await this.prisma.users.create({ data });
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
