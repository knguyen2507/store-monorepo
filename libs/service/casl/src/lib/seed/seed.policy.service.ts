import { Effect } from '@cerbos/core';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ActionEnum } from '@prisma/client/authn';
import { CerbosClient } from '@store-monorepo/service/cerbos';
import { InitialRole } from '@store-monorepo/utility';

@Injectable()
export class SeedPolicyService {
  constructor(private readonly client: CerbosClient) {}

  private readonly cerbos = this.client.connect();

  seed = async () => {
    try {
      const policies = [
        {
          resourcePolicy: {
            resource: 'user',
            version: 'default',
            rules: [
              {
                actions: [
                  ActionEnum.CREATE,
                  ActionEnum.READ,
                  ActionEnum.UPDATE,
                  ActionEnum.DELETE,
                ],
                effect: Effect.ALLOW,
                roles: [InitialRole.id],
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
  };
}
