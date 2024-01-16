import { Expose } from 'class-transformer';
import { BaseModel } from '../base';
import { RoleModel } from '../roles';
import { StoreModel } from '../stores';

export class PermissionModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  role: RoleModel;
  @Expose()
  store: StoreModel;
}
