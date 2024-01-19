import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPermissionById } from '.';
import { PermissionQueryImplement } from '../../../../infrastructure/query/permission';
import { FindPermissionByIdResult } from './result';

@QueryHandler(FindPermissionById)
export class FindPermissionByIdHandler
  implements IQueryHandler<FindPermissionById, FindPermissionByIdResult>
{
  @Inject()
  private readonly permission: PermissionQueryImplement;

  async execute(query: FindPermissionById): Promise<FindPermissionByIdResult> {
    return await this.permission.findById(query);
  }
}
