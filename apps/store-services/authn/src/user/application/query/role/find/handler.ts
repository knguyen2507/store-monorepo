import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRole } from '.';
import { RoleQueryImplement } from '../../../../infrastructure/query/role';
import { FindRoleResult } from './result';

@QueryHandler(FindRole)
export class FindRoleHandler
  implements IQueryHandler<FindRole, FindRoleResult>
{
  @Inject()
  private readonly role: RoleQueryImplement;

  async execute(): Promise<FindRoleResult> {
    return await this.role.find();
  }
}
