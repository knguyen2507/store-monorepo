import { RoleModel } from '../../model/roles';

export interface RoleRepository {
  save: (data: RoleModel) => Promise<RoleModel>;
  getById: (id: string) => Promise<RoleModel>;
  getByUserId: (id: string) => Promise<RoleModel>;
  getSuperAdmin: () => Promise<RoleModel[]>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: RoleModel) => Promise<RoleModel>;
}
