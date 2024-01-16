import { Expose } from 'class-transformer';
import { BaseModel } from '../base';
import { PermissionModel } from '../permissions';

export class StoreModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  address: string;
  @Expose()
  permission: PermissionModel[];
}
