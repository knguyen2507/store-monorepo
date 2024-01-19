import { FindPermissionById } from '../../../application/query/permission/detail';
import { FindPermissionByIdResult } from '../../../application/query/permission/detail/result';
import { FindPermission } from '../../../application/query/permission/find';
import { FindPermissionResult } from '../../../application/query/permission/find/result';

export interface PermissionQuery {
  find: (query: FindPermission) => Promise<FindPermissionResult>;
  findById: (query: FindPermissionById) => Promise<FindPermissionByIdResult>;
}
