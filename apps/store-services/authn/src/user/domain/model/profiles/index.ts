import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export class ProfileModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  roleId?: string;
  @Expose()
  permissionId?: string;
  @Expose()
  userId?: string;

  update(data: Partial<this>) {
    this.roleId = data.roleId ? data.roleId : this.roleId;
    this.permissionId = data.permissionId
      ? data.permissionId
      : this.permissionId;
    this.userId = data.userId ? data.userId : this.userId;
  }
}
