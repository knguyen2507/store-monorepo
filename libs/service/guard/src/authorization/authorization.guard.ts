import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CerbosClient } from '@store-monorepo/service/cerbos';
import { GuardDecoratorParams, RequestWithUser } from '@store-monorepo/utility';

@Injectable()
export class AuthoGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly client: CerbosClient
  ) {}

  private readonly cerbos = this.client.connect();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const dataDecorator = this.reflector.get<GuardDecoratorParams>(
      'data',
      context.getHandler()
    );
    let result = false;

    // if (user.isSuperAdmin) return true;

    const cerbosRequest = {
      principal: {
        id: `${dataDecorator.resource}_${dataDecorator.action}_${user.roleId}`,
        roles: [user.roleId],
      },
      resource: {
        kind: dataDecorator.resource,
        id: '1',
      },
      action: dataDecorator.action,
    };

    console.log(`cerbosRequest:::`, cerbosRequest);

    try {
      result = await this.cerbos.isAllowed(cerbosRequest);
    } catch (error) {
      console.log(`error:::`, error);
      throw new InternalServerErrorException(`Cerbos Error!`);
    }

    return result;
  }
}
