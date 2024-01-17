import { Effect } from '@cerbos/core';
import { AuthPrismaService } from '@leasing-monorepo/prisma';
import { CerbosClient } from '@leasing-monorepo/utility';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SeedPolicyService {
  constructor(
    private readonly client: CerbosClient,
    private readonly prisma: AuthPrismaService,
  ) {}

  private readonly cerbos = this.client.connect();

  seed = async () => {
    try {
      const data = await this.prisma.permissionGroup.findMany({
        select: {
          permissionGroupCode: true,
          permissions: {
            select: {
              id: true,
              action: true,
              roles: {
                select: {
                  id: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      const policies = [];
      for (const item of data) {
        const rules = [];
        for (const permission of item.permissions) {
          for (const role of permission.roles) {
            rules.push({
              actions: [permission.action],
              effect: role.status === 'ACTIVE' ? Effect.ALLOW : Effect.DENY,
              roles: [role.id],
            });
          }
        }
        policies.push({
          resourcePolicy: {
            resource: item.permissionGroupCode,
            version: 'default',
            rules,
          },
        });
      }

      await this.cerbos.addOrUpdatePolicies({ policies });
    } catch (error) {
      console.log(`error:::`, error);
      throw new InternalServerErrorException(`Server Error!`);
    }
  };
}
