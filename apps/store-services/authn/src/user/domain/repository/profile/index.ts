import { ProfileModel } from '../../model/profiles';

export interface ProfileRepository {
  save: (data: ProfileModel) => Promise<ProfileModel>;
  getById: (id: string) => Promise<ProfileModel>;
  getByRoleId: (id: string) => Promise<ProfileModel[]>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: ProfileModel) => Promise<ProfileModel>;
  updateUserId: (userId: string, data: ProfileModel[]) => Promise<void>;
}
