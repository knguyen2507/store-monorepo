import { UserResult } from '@store-monorepo/utility';
import { UserModel } from '../../model/users';

export interface UserRepository {
  save: (data: UserModel) => Promise<UserModel>;
  getById: (id: string) => Promise<UserModel>;
  getByUsername: (username: string) => Promise<UserResult>;
  getByRoleId: (id: string) => Promise<UserModel[]>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: UserModel) => Promise<UserModel>;
}
