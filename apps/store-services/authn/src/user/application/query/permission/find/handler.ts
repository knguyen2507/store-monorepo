import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPermission } from '.';
import { PermissionQueryImplement } from '../../../../infrastructure/query/permission';
import { FindPermissionResult } from './result';

@QueryHandler(FindPermission)
export class FindPermissionHandler
  implements IQueryHandler<FindPermission, FindPermissionResult>
{
  @Inject()
  private readonly permission: PermissionQueryImplement;

  async execute(): Promise<FindPermissionResult> {
    return await this.permission.find();
  }
}
