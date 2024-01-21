import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export class RoleModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  isSuperAdmin: boolean;
  @Expose()
  permissionId: string[];
}
