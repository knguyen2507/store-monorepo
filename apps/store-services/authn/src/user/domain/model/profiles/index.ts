import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export class ProfileModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  roleId: string;
  @Expose()
  permissionId: string;
  @Expose()
  shopId: string;
  @Expose()
  userId: string;
}
