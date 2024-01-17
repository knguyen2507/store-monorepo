import { PermissionModel } from '../../model/permissions';

export interface PermissionRepository {
  save: (data: PermissionModel) => Promise<PermissionModel>;
  getById: (id: string) => Promise<PermissionModel>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: PermissionModel) => Promise<PermissionModel>;
}
