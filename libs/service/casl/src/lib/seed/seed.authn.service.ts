import { Inject, Injectable } from '@nestjs/common';
import {
  ActionEnum,
  AuthnPrismaService,
  StatusEnum,
} from '@store-monorepo/service/prisma';
import {
  InitialRole,
  InitialShop,
  InitialUser,
  UtilityImplement,
} from '@store-monorepo/utility';
import { SeedPolicyService } from './seed.policy.service';

@Injectable()
export class SeedAuthnService {
  constructor(
    @Inject(AuthnPrismaService) private prisma: AuthnPrismaService,
    @Inject(SeedPolicyService) private seedPolicyService: SeedPolicyService,
    private readonly util: UtilityImplement
  ) {}

  seed = async () => {
    let operations: any[] = [];

    const [users, roles, shops, permissions] = await Promise.all([
      this.prisma.users.findMany(),
      this.prisma.roles.findMany(),
      this.prisma.shops.findMany(),
      this.prisma.permissions.findMany(),
    ]);

    if (roles.length === 0) {
      await this.seedPolicyService.seed();
      operations = [
        ...operations,
        this.prisma.roles.create({
          data: InitialRole,
        }),
      ];
    }

    if (shops.length === 0) {
      operations = [
        ...operations,
        this.prisma.shops.create({
          data: InitialShop,
        }),
      ];
    }

    if (users.length === 0) {
      operations = [
        ...operations,
        this.prisma.users.create({
          data: InitialUser,
        }),
      ];
    }

    if (permissions.length === 0) {
      operations = [
        ...operations,
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Create Permission`,
            action: ActionEnum.CREATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop.id } },
            role: { connect: { id: InitialRole.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Update Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop.id } },
            role: { connect: { id: InitialRole.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Read Permission`,
            action: ActionEnum.READ,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop.id } },
            role: { connect: { id: InitialRole.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Delete Permission`,
            action: ActionEnum.DELETE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop.id } },
            role: { connect: { id: InitialRole.id } },
          },
        }),
      ];
    }

    await this.prisma.$transaction(operations);
  };
}
