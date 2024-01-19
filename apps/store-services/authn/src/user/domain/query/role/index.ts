import { FindRoleById } from '../../../application/query/role/detail';
import { FindRoleByIdResult } from '../../../application/query/role/detail/result';
import { FindRole } from '../../../application/query/role/find';
import { FindRoleResult } from '../../../application/query/role/find/result';

export interface RoleQuery {
  find: (query: FindRole) => Promise<FindRoleResult>;
  findById: (query: FindRoleById) => Promise<FindRoleByIdResult>;
}
