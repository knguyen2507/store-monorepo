import { Expose } from 'class-transformer';
import { ShopModel } from '../../../../shop/domain/model/shops';
import { BaseModel } from '../base';
import { RoleModel } from '../roles';

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
  roleId: string;
  @Expose()
  role: RoleModel;
  @Expose()
  shopId: string;
  @Expose()
  shop: ShopModel;
}
