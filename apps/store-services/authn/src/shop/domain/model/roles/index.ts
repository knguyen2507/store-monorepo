import { Expose } from 'class-transformer';
import { BaseModel } from '../base';
import { PermissionModel } from '../permissions';
import { UserModel } from '../users';

export class RoleModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  permission?: PermissionModel[];
  @Expose()
  user?: UserModel[];
}
