import { Inject, Injectable } from '@nestjs/common';
import {
  ActionEnum,
  AuthnPrismaService,
  StatusEnum,
} from '@store-monorepo/service/prisma';
import { UtilityImplement } from '@store-monorepo/utility';

@Injectable()
export class SeedAuthnService {
  constructor(
    @Inject(AuthnPrismaService) private prisma: AuthnPrismaService,
    private readonly util: UtilityImplement
  ) {}

  seed = async () => {
    let operations: any[] = [];
    const id1 = '6502d51ac4841b15cd7756a1';
    const id2 = '6502d51ac4841b15cd7756a2';
    const id3 = '6502d51ac4841b15cd7756a3';

    const [users, roles, shops, permissions] = await Promise.all([
      this.prisma.users.findMany(),
      this.prisma.roles.findMany(),
      this.prisma.shops.findMany(),
      this.prisma.permissions.findMany(),
    ]);

    if (roles.length === 0) {
      operations = [
        ...operations,
        this.prisma.roles.create({
          data: {
            id: id1,
            name: 'Super Admin 1',
          },
        }),
      ];
    }

    if (shops.length === 0) {
      operations = [
        ...operations,
        this.prisma.shops.create({
          data: {
            id: id2,
            name: 'Cửa hàng Nguyên Phát',
            address: 'QL.19B, Thuận Đức, Nhơn Mỹ, An Nhơn, Bình Định',
          },
        }),
      ];
    }

    if (users.length === 0) {
      operations = [
        ...operations,
        this.prisma.users.create({
          data: {
            id: id3,
            name: 'Super Admin 1',
            phone: '0987654321',
            username: 'superadmin001',
            password:
              '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
            isSuperAdmin: true,
          },
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
            profile: {
              create: {
                id: this.util.generateId(),
                roleId: id1,
                shopId: id2,
                userId: id3,
              },
            },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Update Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            profile: {
              create: {
                id: this.util.generateId(),
                roleId: id1,
                shopId: id2,
                userId: id3,
              },
            },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Read Permission`,
            action: ActionEnum.READ,
            status: StatusEnum.ACTIVE,
            profile: {
              create: {
                id: this.util.generateId(),
                roleId: id1,
                shopId: id2,
                userId: id3,
              },
            },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: this.util.generateId(),
            name: `Cửa hàng Nguyên Phát Delete Permission`,
            action: ActionEnum.DELETE,
            status: StatusEnum.ACTIVE,
            profile: {
              create: {
                id: this.util.generateId(),
                roleId: id1,
                shopId: id2,
                userId: id3,
              },
            },
          },
        }),
      ];
    }

    await this.prisma.$transaction(operations);
  };
}
