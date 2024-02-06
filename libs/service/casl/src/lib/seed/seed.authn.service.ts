import { Inject, Injectable } from '@nestjs/common';
import { ActionEnum, AuthnPrismaService, StatusEnum } from '@store-monorepo/service/prisma';
import {
  InitialRole1,
  InitialRole2,
  InitialRole3,
  InitialShop1,
  InitialShop2,
  InitialShop3,
  InitialShop4,
  InitialUser1,
  InitialUser2,
  InitialUser3,
  UtilityImplement,
} from '@store-monorepo/utility';

@Injectable()
export class SeedAuthnService {
  constructor(
    @Inject(AuthnPrismaService) private prisma: AuthnPrismaService,
    private readonly util: UtilityImplement,
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
      operations = [
        ...operations,
        this.prisma.roles.create({
          data: InitialRole1,
        }),
        this.prisma.roles.create({
          data: InitialRole2,
        }),
        this.prisma.roles.create({
          data: InitialRole3,
        }),
      ];
    }

    if (shops.length === 0) {
      operations = [
        ...operations,
        this.prisma.shops.create({
          data: InitialShop1,
        }),
        this.prisma.shops.create({
          data: InitialShop2,
        }),
        this.prisma.shops.create({
          data: InitialShop3,
        }),
        this.prisma.shops.create({
          data: InitialShop4,
        }),
      ];
    }

    if (users.length === 0) {
      operations = [
        ...operations,
        this.prisma.users.create({
          data: InitialUser1,
        }),
        this.prisma.users.create({
          data: InitialUser2,
        }),
        this.prisma.users.create({
          data: InitialUser3,
        }),
      ];
    }

    if (permissions.length === 0) {
      operations = [
        ...operations,
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac01`,
            name: `${InitialShop1.name} Create Permission`,
            action: ActionEnum.CREATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop1.id } },
            role: { connect: { id: InitialRole2.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac02`,
            name: `${InitialShop1.name} Update Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop1.id } },
            role: { connect: { id: InitialRole2.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac03`,
            name: `${InitialShop1.name} Read Permission`,
            action: ActionEnum.READ,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop1.id } },
            role: { connect: { id: InitialRole2.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac04`,
            name: `${InitialShop1.name} Delete Permission`,
            action: ActionEnum.DELETE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop1.id } },
            role: { connect: { id: InitialRole2.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac05`,
            name: `${InitialShop2.name} Create Permission`,
            action: ActionEnum.CREATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop2.id } },
            role: { connect: { id: InitialRole3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac06`,
            name: `${InitialShop2.name} Update Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop2.id } },
            role: { connect: { id: InitialRole3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac07`,
            name: `${InitialShop2.name} Read Permission`,
            action: ActionEnum.READ,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop2.id } },
            role: { connect: { id: InitialRole3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac08`,
            name: `${InitialShop2.name} Delete Permission`,
            action: ActionEnum.DELETE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop2.id } },
            role: { connect: { id: InitialRole3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac09`,
            name: `${InitialShop3.name} Create Permission`,
            action: ActionEnum.CREATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac10`,
            name: `${InitialShop3.name} Update Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac11`,
            name: `${InitialShop3.name} Read Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac12`,
            name: `${InitialShop3.name} Delete Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop3.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac13`,
            name: `${InitialShop4.name} Create Permission`,
            action: ActionEnum.CREATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop4.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac14`,
            name: `${InitialShop4.name} Update Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop4.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac15`,
            name: `${InitialShop4.name} Read Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop4.id } },
          },
        }),
        this.prisma.permissions.create({
          data: {
            id: `65ae3be1f774570f1308ac16`,
            name: `${InitialShop4.name} Delete Permission`,
            action: ActionEnum.UPDATE,
            status: StatusEnum.ACTIVE,
            shop: { connect: { id: InitialShop4.id } },
          },
        }),
      ];
    }

    await this.prisma.$transaction(operations);
  };
}
