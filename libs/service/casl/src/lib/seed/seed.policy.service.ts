import { Effect } from '@cerbos/core';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CerbosClient } from '@store-monorepo/service/cerbos';
import {
  InitialRole,
  permissionResource,
  roleResource,
  shopResource,
  userResource,
} from '@store-monorepo/utility';

@Injectable()
export class SeedPolicyService {
  constructor(private readonly client: CerbosClient) {}

  private readonly cerbos = this.client.connect();

  seed = async () => {
    const roots = [
      permissionResource,
      roleResource,
      shopResource,
      userResource,
    ];

    for (const item of roots) {
      for (const i of item.attributes) {
        try {
          await this.cerbos.addOrUpdatePolicies({
            policies: [
              {
                resourcePolicy: {
                  resource: `${item.root}:${i.kind}`,
                  version: 'default',
                  rules: [
                    {
                      actions: [i.action],
                      effect: Effect.ALLOW,
                      roles: [InitialRole.id],
                    },
                  ],
                },
              },
            ],
          });
        } catch (error) {
          console.log(`error:::`, error);
          throw new InternalServerErrorException(`Server Error!`);
        }
      }
    }
  };
}
