import { Inject } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { plainToClass } from 'class-transformer';
import { FindPermissionByIdResult } from '../../../application/query/permission/detail/result';
import { FindRoleById } from '../../../application/query/role/detail';
import { FindRoleByIdResult } from '../../../application/query/role/detail/result';
import {
  FindRoleResult,
  FindRoleResultItem,
} from '../../../application/query/role/find/result';
import { RoleQuery } from '../../../domain/query/role';

export class RoleQueryImplement implements RoleQuery {
  @Inject()
  private readonly prisma: AuthnPrismaService;

  async find(): Promise<FindRoleResult> {
    const roles = await this.prisma.roles.findMany({
      include: { profile: { include: { permission: true } } },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });

    const items = roles.map((i) => {
      const permission = i.profile.map((profile) => {
        return plainToClass(
          FindPermissionByIdResult,
          {
            id: profile.permission.id,
            name: profile.permission.name,
            status: profile.permission.status,
            action: profile.permission.action,
          },
          {
            excludeExtraneousValues: true,
          }
        );
      });

      return plainToClass(
        FindRoleResultItem,
        {
          id: i.id,
          name: i.name,
          permission,
        },
        {
          excludeExtraneousValues: true,
        }
      );
    });

    return {
      items,
      total: 0,
    };
  }

  async findById(query: FindRoleById): Promise<FindRoleByIdResult> {
    const role = await this.prisma.roles.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindRoleByIdResult, role, {
      excludeExtraneousValues: true,
    });
  }
}