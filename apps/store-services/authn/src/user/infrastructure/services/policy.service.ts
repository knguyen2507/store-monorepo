import { Effect } from '@cerbos/core';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CerbosClient } from '@store-monorepo/service/cerbos';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { RoleModel } from '../../domain/model/roles';

@Injectable()
export class PolicyService {
  constructor(private readonly client: CerbosClient) {}
  @Inject()
  private readonly prisma: AuthnPrismaService;

  private readonly cerbos = this.client.connect();

  async AddPrincipalPolicy(model: RoleModel) {
    for (const id of model.permissionId) {
      const permission = await this.prisma.permissions.findUnique({
        where: { id },
      });
      try {
        const policies = [
          {
            principalPolicy: {
              principal: `user_${permission.action}_${model.id}`,
              version: 'default',
              rules: [
                {
                  resource: 'user',
                  actions: [
                    {
                      action: permission.action,
                      effect: Effect.ALLOW,
                      condition: {
                        match: {
                          all: {
                            of: [
                              {
                                expr: `'${model.id}' in request.principal.roles`,
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        ];

        await this.cerbos.addOrUpdatePolicies({ policies });
      } catch (error) {
        console.log(`error:::`, error);
        throw new InternalServerErrorException(`Server Error!`);
      }
    }
  }
}
