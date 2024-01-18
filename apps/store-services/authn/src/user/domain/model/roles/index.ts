import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export class RoleModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
}
