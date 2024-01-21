import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ActionEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class PermissionModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  status: StatusEnum;
  @Expose()
  action: ActionEnum;
  @Expose()
  shopId: string;
  @Expose()
  roleId: string[];
}
