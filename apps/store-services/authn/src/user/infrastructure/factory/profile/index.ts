import { Profiles } from '@prisma/client/authn';
import { ProfileModel } from '../../../domain/model/profiles';
import { BaseFactory } from '../base';

export class ProfileFactory extends BaseFactory {
  createProfileModel(profile: Profiles | null) {
    if (!profile) return null;

    const entity = this.createModel(ProfileModel, {
      ...profile,
    });

    return entity;
  }

  createProfileModels(profiles: Profiles[] | null) {
    if (!profiles) return null;

    return profiles.map((a) => this.createProfileModel(a));
  }
}
