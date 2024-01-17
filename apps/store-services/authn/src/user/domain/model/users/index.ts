import { Expose } from 'class-transformer';
import { BaseModel } from '../base';
import { RoleModel } from '../roles';

export class UserModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  username: string;
  @Expose()
  password: string;
  @Expose()
  roleId: string;
  @Expose()
  role: RoleModel;
  @Expose()
  created: Date;

  update(data: Partial<this>) {
    this.password = data.password ? data.password : this.password;
  }
}
