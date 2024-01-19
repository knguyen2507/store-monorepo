import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRoleById } from '.';
import { RoleQueryImplement } from '../../../../infrastructure/query/role';
import { FindRoleByIdResult } from './result';

@QueryHandler(FindRoleById)
export class FindRoleByIdHandler
  implements IQueryHandler<FindRoleById, FindRoleByIdResult>
{
  @Inject()
  private readonly role: RoleQueryImplement;

  async execute(query: FindRoleById): Promise<FindRoleByIdResult> {
    return await this.role.findById(query);
  }
}
